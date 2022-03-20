export default function(grade){
    const values = grade?.evaluations?.filter(item => item.type==='Control'||item.type==='Exam'||item.type==='Lab')
                              .sort((a, b) => a.type < b.type ? -1 : 1);
                //if doesn't work try to use arr.some() instead of includes()
                //eval => ['Control','Exam','Lab'].includes(eval.type)
    
    if (grade===undefined) {
        return 0.00;
    }
    else if(values.length===1){
        return values[0].value;
    } else {
        //console.log(values[0].value * grade.course.controlCoef + values[1].value * grade.course.examCoef)
        return values[0].value * grade.course.controlCoef + values[1].value * grade.course.examCoef; 
    }
    
}