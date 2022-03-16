// função para pegar variavel da URL
export default function(parameter) {  
    const loc = location.search.substring(1, location.search.length);   
    let param_value = false;   
    const params = loc.split("&"); 
    params.forEach((param)=>{
        const param_name = param.substring(0,param.indexOf('='));   
        if (param_name == parameter) {                                          
            param_value = param.substring(param.indexOf('=')+1);   
        };
    });

    if (param_value) {   
        return param_value;   
    }   
    else {   
        return undefined;
    }   
}