export function extractQueryParams(query){
    return query.substr(1).split('&').reduce((queryParams,param)=>{//pega tudo menos o primeiro caracter
        const [key,value] = param.split('=')//pega o key e o value

        queryParams[key] = value

        return queryParams
    },{})
}