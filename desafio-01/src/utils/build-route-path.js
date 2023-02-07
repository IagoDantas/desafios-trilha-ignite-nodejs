export function buildRoutePath(path){
    const routeParametersRegex = /:([a-zA-Z]+)/g
    const pathWithParams = path.replaceAll(routeParametersRegex,'(?<$1>[a-z0-9\-_]+)')// substitui o :id por ([a-z0-9\-_]+) que é uma regex que aceita letras minusculas, numeros, hifen e underline


    const pathRegex =  new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`)// começa com a regex do pathWithParams
      
    return pathRegex
}