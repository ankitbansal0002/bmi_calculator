const age = document.getElementById("age")
const height = document.getElementById("height")
const weight = document.getElementById("weight")
const submit = document.getElementById("submit")
const text = document.getElementById('text')
const info = document.getElementById('info')

console.log(height);
// console.log(weight.value)

const category = [
                    {id:1 , name: [
                        {id: 1, name: "Severe thinness"},
                        {id: 2, name: "Moderate Thinness"},
                        {id: 3, name: "Mild Thinness"}
                    ]},
                    {id: 2, name: "Normal"},
                    {id: 3, name: "OverWeight"},
                    {id:4 , name: [
                        {id: 1, name: "Obesity I"},
                        {id: 2, name: "Obesity II"},
                        {id: 3, name: "Obesity III"}
                    ]}
                ]  

function bmi_visual (bmi, i, j) {

    const bmi_range_low = ((18.5*height.value*height.value)/10000).toFixed(2);
    const bmi_range_high = ((25*height.value*height.value)/10000).toFixed(2);
    const weight_action_loss = "Loss";
    const weight_action_gain = "Gain";

    if( j === -1){
        text.innerText = `BMI = ${(bmi).toFixed(2)} 
        ${category[i].name}`;
    }else{
        text.innerText = `BMI = ${(bmi).toFixed(2)} 
        ${category[i].name[j].name}`;
    }

    
    info.innerHTML = `<h2>Suggestions</h2>
    <ul>
        <li> Healthy BMI range: 18.5 kg/m2 - 25 kg/m2 </li>
        <li> Healthy weight for your height: 
                    ${bmi_range_low} 
                    kgs - ${bmi_range_high} kgs </li>
        <li> Ponderal Index: ${((bmi/height.value)*100).toFixed(2)} kg/m3 </li>
    </ul>`

    if( bmi < 18.5 || bmi > 25){
        const node = document.createElement("li");
        if(bmi < 18.5){
            const textnode = document.createTextNode(`${weight_action_gain} ${(bmi_range_low-weight.value).toFixed(1)} kgs to reach a BMI of 25 kg/m2.`);
            node.appendChild(textnode);
            info.querySelector('ul').appendChild(node);
        }else{
            const textnode = document.createTextNode(`${weight_action_loss} ${(weight.value-bmi_range_high).toFixed(1)} kgs to reach a BMI of 25 kg/m2.`);
            node.appendChild(textnode);
            info.querySelector('ul').appendChild(node);
        }
    }
}                

function bmi_cal (){

    submit.addEventListener("click", (e) => {
        e.preventDefault();
        const w = weight.value;
        const h = height.value;
        const bmi = (w/h/h)*10000;
        let i = 0;
        if(bmi <= 18.5){
            let j = 0;
            i = 0;
           if(bmi < 16){
                j = 0;
           }
           if(bmi > 16 && bmi  < 17){
                j = 1;
            }
           if(bmi > 17){
                j = 2;
            }
            bmi_visual(bmi, i, j);
        }
        if(bmi >= 18.5 && bmi < 25) {
            i = 1;
            bmi_visual(bmi, i, -1);
        }
        if(bmi >= 25 && bmi < 30) {
            i = 2;
            bmi_visual(bmi, i, -1);
        }
        if(bmi > 30){
            let j = 0;
            i = 3;
           if(bmi <= 35){
                j = 0;
           }
           if(bmi > 35 && bmi < 40){
                j = 1;
            }
           if(bmi >= 40){
                j = 2;
            }
            bmi_visual(bmi, i, j);
        }
    })
}

bmi_cal();