// for Registration form
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
togglePassword.addEventListener('click',
 () => {
    event.preventDefault();

    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';

    if(type==="text")
    {
        togglePassword.classList.remove("bi-eye-slash");
        togglePassword.classList.add("bi-eye");
    }
    else
    {
        togglePassword.classList.remove("bi-eye");
        togglePassword.classList.add("bi-eye-slash");
    }
    password.setAttribute('type', type);
});

const errorsPersonal={firstname:false,middlename:false,lastname:false,gender:false,dob:false,
jobProfile:false,phone:false,email:false,password:false
}
const errorsAddress={streetAddress:false,city:false,district:false,state:false,postalCode:false}
let totalAdded=0;
let educationInfoData ={degree:false,university:false,totalmarks:false,marksobtained:false};

function checkAddorNot()
{
  
   const nextbtn=document.getElementById('addQualificationButton')
   let tempQualifications={};
   for(let i in educationInfoData)
   {
     tempQualifications[i]=document.getElementById(i).value;
   }

   let nextEnable=true;

   for(let i in educationInfoData)
   {
       if(educationInfoData[i])
       {
           nextbtn.classList.add('disableButton');
           nextbtn.disabled=true;
           break;
       }
   }
   for(let i in educationInfoData)
   {
       if(educationInfoData[i]||tempQualifications[i]==undefined||tempQualifications[i].length==0)
       {
          nextEnable=false;
          break;
       }
   }

   if(nextEnable)
   {
   nextbtn.classList.remove('bg-secondary');
   nextbtn.classList.add('bg-success');
   nextbtn.classList.remove('disableButton');
   nextbtn.disabled=false;
   
   }
   else
   {
       nextbtn.classList.remove('bg-success');
       nextbtn.classList.add('bg-secondary');
   }

}

let educationDegreeData=[]


function enablefinalButton()
{
    const nextbtn=document.getElementById("finalSubmit");
    
    if(totalAdded>=3)
    {
    nextbtn.classList.remove('bg-secondary');
    nextbtn.classList.add('bg-success');
    nextbtn.classList.remove('disableButton');
    nextbtn.disabled=false;
    }
    else
    {
        nextbtn.classList.remove('bg-success');
        nextbtn.classList.add('bg-secondary');
        document.querySelector('.lessthanthree').innerHTML='';
    }

}


function checkingEnable(formId,errors)
{   
    const nextbtn=document.getElementById('submit'+formId);

    let formData=formFetchValue(formId);
    console.log("formData",formData)
    console.log(errorsAddress);
    let nextEnable=true;

    for(let i in errors)
    {
        if(errors[i])
        {
            nextbtn.classList.add('disableButton');
            nextbtn.disabled=true;
            return ;
        }
    }
    nextbtn.classList.remove('disableButton');
    nextbtn.disabled=false;
    for(let i in errors)
    {
        if(i=='middlename')continue;
        

        if(errors[i]||formData[i]==undefined||formData[i].length==0)
        {
           nextEnable=false;
           break;
        }
    }

    if(nextEnable)
    {
    nextbtn.classList.remove('bg-secondary');
    nextbtn.classList.add('bg-success');
    nextbtn.classList.remove('disableButton');
    nextbtn.disabled=false;
    }
    else
    {
        nextbtn.classList.remove('bg-success');
        nextbtn.classList.add('bg-secondary');
    }
}

function formFetchValue(formId) {
    const form = document.getElementById(formId);
    const formData = {};
    
    Array.from(form.elements).forEach(input => {
        if (input.tagName === 'INPUT' && !input.value) return;
        if (input.tagName === 'SELECT') {
            const selectedOption = input.options[input.selectedIndex];
            formData[input.name] = selectedOption.value;
        } else if (input.tagName === 'INPUT' && (input.type === 'submit' || input.type === 'button')) {
            return;
        } else {
            formData[input.name] = input.value;
        }
    });

    return formData;
}


function addDegree(event)
 {
    console.log("in")
    event.preventDefault();
    const form = document.getElementById('degreeData');
    const degreeData = {
        degree: form.querySelector('#degree').value,
        university: form.querySelector('#university').value,
        totalMarks: form.querySelector('#totalmarks').value,
        marksObtained: form.querySelector('#marksobtained').value
    };

    console.log(degreeData)
    for(let x in degreeData)
    { 
        y=degreeData[x];
        console.log(y);
        
         if(degreeData[x]==undefined||y.length==0||y=='')
         {
            console.log(x,y);
            document.getElementById(x.toLowerCase()).focus();
            return ;
         }

    }
    let percentage=((degreeData.marksObtained/degreeData.totalMarks)*100).toFixed(2);

    let educationDegree = '<h3>Degree:</h3>' +
    '<h4>' + degreeData.degree + '</h4>' + '   '+
    '<h3>University:</h3>' +
    '<h4>' + degreeData.university + '</h4>' +'   '+
    '<h3>Percentage:</h3>' +
    '<h4>' + percentage + '</h4>';

    educationDegreeData.push(educationDegree);


    const tablerow = document.getElementById('qualificationsDetails');
    const row = document.createElement('tr');
    row.classList.add('degreeDataInfo');
    document.querySelector('.lessthanthree').innerHTML='';

    let text = `
        <td>${totalAdded+1}</td>
        <td>${degreeData.degree}</td>
        <td>${degreeData.university}</td>
        <td>${percentage}%</td>
    `;
    row.innerHTML = text;
    tablerow.appendChild(row);
    totalAdded=totalAdded+1;

    const degree = document.getElementById('degree');
    const university = document.getElementById('university');
    const totalmarks = document.getElementById('totalmarks');
    const marksobtained = document.getElementById('marksobtained');

    degree.value = '';
    university.value = '';
    totalmarks.value = '';
    marksobtained.value = '';

    document.querySelector('.threeQualifications').style.display='none';
    educationInfoData ={degree:false,university:false,totalmarks:false,marksobtained:false};


    return false;
}

// step form next logic 

var StepFormsId =["registration","addressInfo","educationInfo"];
var curform= 0;

function Next()
{
    document.getElementById(StepFormsId[curform]).style.display='none';
    document.getElementById(StepFormsId[++curform]).style.display='block';
    
}

//step form previous logic

function Previous()
{
    document.getElementById(StepFormsId[curform]).style.display='none';
    document.getElementById(StepFormsId[--curform]).style.display='block';
}


// personal Information

function personalInfoSubmit(event)
{  
    event.preventDefault();
    const tempData=formFetchValue(event.target.id);
    localStorage.setItem('personalInfoData',JSON.stringify(tempData));

    document.querySelector('.loading-overlay').style.display = 'block';
    setTimeout(() => {
        Next();
        document.querySelector('.loading-overlay').style.display = 'none';

    }, 2000);


    return false;
}

function addressInfoSubmit(event)
{ 
    event.preventDefault();
    const tempData=formFetchValue(event.target.id);
    localStorage.setItem('addressInfoData',JSON.stringify(tempData));
    document.querySelector('.loading-overlay').style.display = 'block';
    setTimeout(() => {
        Next();
        document.querySelector('.loading-overlay').style.display = 'none';

    }, 2000);
    return false;
}

function educationInfoSubmit(event)
{ 
    event.preventDefault();
    if(totalAdded<3)
    {
        console.log("in");
        document.querySelector('.lessthanthree').innerHTML=`* Please Add Atleast 3 Qualifications`;
        return false;
    }


    localStorage.setItem('EducationInfoData',JSON.stringify(educationDegreeData));
    document.querySelector('.loading-overlay').style.display = 'block';
    setTimeout(() => {
        document.querySelector('.loading-overlay').style.display = 'none';
        curform=0;
        window.location.href='formData.html';

    }, 2000);


    return false;
}


//
function showError(msg,id,errors)
{
      document.querySelector('.error'+id).innerHTML=msg;
      let temp=document.getElementById(id);
      temp.classList.add('borderRed');
      errors[id]=true;
}

function noError(id,errors)
{
    document.querySelector('.error'+id).innerHTML='';
    errors[id]=false;
    let temp=document.getElementById(id);
    temp.classList.remove('borderRed');


}

function fetchValue(id)
{
    return document.getElementById(id).value;
}

//validations


function checkField(event,id) 
{
    const ch = event.key
    const regexName = /[^a-zA-Z]+/; //form name ;
    const job= /[^a-zA-Z\s]+/; 
    const checkFieldKey = { 'username': regexName,'jobProfile':job};

    if (checkFieldKey[id].test(ch)&&ch!='Backspace')
    {
         event.preventDefault();
    }
}

function checkLengthError(event,id, len,errors)
{ 
    const regexPhone = /[^0-9]+/;
    let val=fetchValue(id);
    let ch=event.key;
    let errorsmsg={phone:"* Phone Number Length should be 10",postalCode:"Postal Code Length should be 6",totalmarks:"* Enter Valid Marks"
   ,marksobtained:'* Invalid Marks '
}
console.log("value", val);
    if (regexPhone.test(ch)&&ch!='Backspace')
    {
         event.preventDefault();
         return ;
    }

    let l = val.length + 1;
    if (event.key === 'Backspace') {
        l = l - 2;
    }

    if (l <= 0) {
        noError(id,errors);
        return;
    }
    if (l < len) {
        showError(errorsmsg[id], id,errors);
        return ;
    }
    noError(id,errors);

}

function checkJobProfile(event)
{
    let ch=event.key;
    let val=fetchValue(event.target.id);
    if(val.length>=0&&(val.length==0||val.at(-1)==' ')&&ch==' ')
    {
        event.preventDefault(); 
        return;
    }
}   

function checkError(id)
{
    let val=fetchValue(id);
    const invalidEmailRegex = /^(?!.*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}).+$/;
   let passwordRegex= /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;

    let regexs={email:invalidEmailRegex,password:passwordRegex}
    let msg={email:"* Invalid Email",password:"Invalid Password ,Should contains Special ,lower ,capital,digits <br>(Min Lenght should be 7)"};
    console.log(val);
    
  if ((regexs[id].test(val)&&val!='')||(id=='email')&&val.indexOf(' ')!=-1)
    { 
        showError(msg[id],id,errorsPersonal)
    }
    else
    {
        noError(id,errorsPersonal);
    }
}

function marksCheck(errors)
{
    console.log("inside",educationInfoData.marksobtained);

    let total=parseInt(fetchValue('totalmarks'));
    let markgot=parseInt(fetchValue('marksobtained'));
    if(markgot>total && total>0 && markgot>0)
    {
        showError('* Invalid Marks','marksobtained',errors);
    }
    else
    {
    
        noError('marksobtained',errors);
    }


}

