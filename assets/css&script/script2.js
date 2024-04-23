const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
togglePassword.addEventListener('click',
    () => {

        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';

        if (type === "text") {
            togglePassword.classList.remove("bi-eye-slash");
            togglePassword.classList.add("bi-eye");
        }
        else {
            togglePassword.classList.remove("bi-eye");
            togglePassword.classList.add("bi-eye-slash");
        }
        password.setAttribute('type', type);
    });

var StepFormsId = ["registration", "addressInfo", "educationInfo"];
var curform = 0;

function Next() {
    document.getElementById(StepFormsId[curform]).style.display = 'none';
    document.getElementById(StepFormsId[++curform]).style.display = 'block';

}

//step form previous logic

function Previous() {
    document.getElementById(StepFormsId[curform]).style.display = 'none';
    document.getElementById(StepFormsId[--curform]).style.display = 'block';
}

function restrictValue(event, regexCheck) {

    let key = event.key;
    const regexName = /[^a-zA-Z]+/; //form name ;
    const regexPhone = /[^0-9]+/;
    const regexPlace = /[^a-zA-z\s]+/
    let value = event.target.value;

    let regex = { 'username': regexName, 'phone': regexPhone, 'place': regexPlace }
    if (regex[regexCheck].test(key) && key != 'Backspace'&&key!='ArrowLeft'&&key!='ArrowRight') {
        event.preventDefault();
        return;
    }
    else {
        if (regexCheck == 'place') {
            if (value.length == 0 && key == ' ') {
                event.preventDefault();
            } else if (value.at(-1) == ' ' && key == ' ') {
                event.preventDefault();
            }


        }
    }
}

function showError(msg, id) {
   
    document.querySelector('.error' + id).innerHTML = msg;
    if(id=='password')
    id='passwordBox'
    let temp = document.getElementById(id);
    temp.classList.add('borderRed');
}

function noError(id) {
   
    document.querySelector('.error' + id).innerHTML = '';
    if(id=='password')
    id='passwordBox'
    let temp = document.getElementById(id);
    temp.classList.remove('borderRed');
}



function checkValidation(value, id) {
    const invalidEmailRegex = /^(?!.*[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}).+$/;
    const passwordRegex = /^(.{0,7}|[^0-9]*|[^A-Z]*|[^a-z]*|[a-zA-Z0-9]*)$/;
    const phoneRegex = /^\d{0,9}$/;
    const postalcode = /^\d{0,5}$/;

    const regex = { password: passwordRegex, email: invalidEmailRegex, phone: phoneRegex, postalCode: postalcode };

    const msg = {
        phone: '* Invalid Phone Number(Length should be 10)', postalCode: '* Invalid Postal Code (Length should be 6)',
        totalmarks: '* Invalid Marks', marksobtained: '* Invalid Marks', email: "* Invalid Email", password: "* Invalid Password ,Should contains Special ,lower ,capital,digits(Min Lenght should be 7)"

    };

    if (regex[id].test(value)) {
        showError(msg[id], id);
        return true;
    }

    noError(id);

    return false;
}

let formData = {};

function disableButtonOrNot(formId) {
    const form = document.getElementById(formId);
    const formFields = {};
 
    Array.from(form.elements).forEach(input => {
        if (input.tagName === 'INPUT' && input.type === 'radio') {
            if (input.checked) {
                formFields[input.name] = input.value;
            }else
            {
                if(input.name in formFields && formFields[input.name].length!=0)
                {
                    return ;
                }
                formFields[input.name] = '';

            }
        } else if (input.tagName === 'INPUT' && input.type === 'date') {
            formFields[input.name] = input.value;
        } else if (input.tagName === 'SELECT') {
            const selectedOption = input.options[input.selectedIndex];
            formFields[input.name] = selectedOption.value;
        } else if (input.tagName === 'INPUT' && (input.type === 'submit' || input.type === 'button')) {
            return;
        } else {
            formFields[input.name] = input.value;
        }
    });

    let passed = true;
    for (let i in formFields) {
        if (i != 'middlename' && formFields[i].length == 0) {
            passed = false;
            break;
        }
    }

    formData = formFields;
    if (passed) {
        makeButtonActive('submit' + formId);

    } else {
        makeButtonDisable('submit' + formId);
    }


}


let fieldNameToValidate = 
{
    'registration-form': ['password', 'email', 'phone']
    , 'addressInfo-form': ['postalCode']
}


function onSubmitPersonal(event) {
    event.preventDefault();
    let fieldstoValidate = fieldNameToValidate[event.target.id];
    let errorPresent = false;
    fieldstoValidate.forEach((val) => {
        if (checkValidation(formData[val], val)) {
            errorPresent = true;
        }
    })

    if (errorPresent)
        return false;
    
    localStorage.setItem(event.target.id + 'Data', JSON.stringify(formData));
    formData={};

    document.querySelector('.loading-overlay').style.display = 'block';
    setTimeout(() => {
        Next();
        document.querySelector('.loading-overlay').style.display = 'none';

    }, 2000);


    return false;
}

let totalAdded = 0;


let degreeData = {};

function OnchangeDegreeData() 
{
    let lengthData = 0;
    const infoDegree = ['degree', 'university', 'totalmarks', 'marksobtained'];
    infoDegree.forEach((val) => {
        let value = document.getElementById(val).value;
        if (value.length != 0) {
            ++lengthData;
            degreeData[val] = value;
        }
    })
const element=document.getElementById('addQualificationButton');
    if (lengthData == 4) {
        makeButtonActive('addQualificationButton');
        
    }
    else {
        makeButtonDisable('addQualificationButton');

    }

}

let educationDegreeData = [];
let degreeDataBase=[];


function AddDegreeData() 
{

    educationDegreeData=[];
     
    if (parseInt(degreeData['marksobtained']) > parseInt(degreeData['totalmarks'])) {
        showError('* Invalid Marks ', 'marksobtained');
        return;
    }
    else {
        noError('marksobtained');
    }


    makeButtonDisable('addQualificationButton');

    degreeDataBase.push([degreeData.degree,degreeData.university,degreeData.totalmarks,degreeData.marksobtained]);
   
    AddingDegreeDataToTable(degreeDataBase);
    totalAdded = degreeDataBase.length;
    checkTotalAdded()
    degreeData = {};

    const degree = document.getElementById('degree');
    const university = document.getElementById('university');
    const totalmarks = document.getElementById('totalmarks');
    const marksobtained = document.getElementById('marksobtained');

    degree.value = '';
    university.value = '';
    totalmarks.value = '';
    marksobtained.value = '';

}

function checkTotalAdded() {

    if (degreeDataBase.length >= 3) {
        makeButtonActive('finalSubmit');
    }
    else{
        makeButtonDisable('finalSubmit');
    }

}


function AddingDegreeDataToTable(degreeDataBase)
{
    const tablerow = document.getElementById('qualificationsDetails');

    while (tablerow.rows.length > 1) {
       tablerow.deleteRow(1);
   }
   degreeDataBase.forEach((val,index)=>
   {
       let percentage = ((val[3] / val[2]) * 100).toFixed(2);
       const row = document.createElement('tr');
       row.classList.add('degree'+index);
       row.classList.add('degreeDataInfo');
       let text = `
       <td>${index+1}</td>
       <td>${val[0]}</td>
       <td>${val[1]}</td>
       <td>${percentage}%</td>`;
       text+=`<td><i class="fa fa-edit text-secondary" id="${'edit'+index}" onclick="editDegree(event)"></i>
       <i class="fa-solid fa-delete-left fs-4 text-danger" id="${'delete'+index}" onclick="deleteDegree(event)"></i>
       </td>`;
   row.innerHTML = text;
   tablerow.appendChild(row);

   }
);
}


function deleteDegree(event)
{

    const selectedDegree=event.target.id;
    const index_position=selectedDegree.slice(6);
    console.log(index_position,degreeDataBase);
    const rowid='.degree'+index_position;
    const table=document.getElementById('qualificationsDetails');
    const row=document.querySelector(rowid);
    table.removeChild(row);

    degreeDataBase=degreeDataBase.filter((v,index)=>
    {
            if(index==index_position)return false;
            else
             return true;
    }
);

AddingDegreeDataToTable(degreeDataBase);
checkTotalAdded();
}


function makeButtonDisable(id) {

    const nextbtn = document.getElementById(id);
    nextbtn.classList.remove('bg-success');
    nextbtn.classList.add('bg-secondary');
    nextbtn.classList.add('disableButton');
    nextbtn.classList.remove('btnNext')
    nextbtn.disabled = true;

}

function makeButtonActive(id) {
    const nextbtn = document.getElementById(id);

    nextbtn.classList.remove('bg-secondary');
    nextbtn.classList.add('bg-success');
    nextbtn.classList.remove('disableButton');
    nextbtn.classList.add('btnNext')

    nextbtn.disabled = false;
}

function finalSubmitEducation(event) {
    event.preventDefault();

    educationDegreeData=degreeDataBase.map((val,index)=>{
        let percentage = ((val[3] / val[2]) * 100).toFixed(2);
        let text=`
        <td>${index + 1}</td>
        <td>${val[0]}</td>
        <td>${val[1]}</td>
        <td>${percentage}%</td>
        `
        return text;

})

    localStorage.setItem('EducationInfoData', JSON.stringify(educationDegreeData));
    document.querySelector('.loading-overlay').style.display = 'block';
    setTimeout(() => {
        document.querySelector('.loading-overlay').style.display = 'none';
        curform = 0;
        window.location.href = 'formData.html';
        let formsId= ['registration-form','addressInfo-form','educationInfo-form'];
        formsId.forEach((val)=>{
            const form = document.getElementById(val);
            form.reset();
        })


    }, 2000);

    return false;
}


function editDegree(event)
{

    const selectedDegree=event.target.id;
    const index_position=selectedDegree.slice(4);
    console.log(index_position,degreeDataBase);
    const rowid='.degree'+index_position;
    const table=document.getElementById('qualificationsDetails');
    const row=document.querySelector(rowid);
    table.removeChild(row);
    
    const degree = document.getElementById('degree');
    const university = document.getElementById('university');
    const totalmarks = document.getElementById('totalmarks');
    const marksobtained = document.getElementById('marksobtained');
    degree.value=degreeDataBase[index_position][0];
    university.value=degreeDataBase[index_position][1];
    totalmarks.value=degreeDataBase[index_position][2];
    marksobtained.value=degreeDataBase[index_position][3];

    degreeDataBase=degreeDataBase.filter((v,index)=>
    {
            if(index==index_position)return false;
            else
             return true;
    }
);

makeButtonActive('addQualificationButton');
OnchangeDegreeData();
checkTotalAdded();

}  

let selected='';

function unchecked(event)
{
     const ele=document.getElementById(event.target.id);
     console.log(ele.value);
     if(selected==ele.value)
     {
        ele.checked=false;
        selected='';
     }
     else
     {
        selected=ele.value;
     }

}



