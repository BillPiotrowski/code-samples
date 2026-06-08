
export type SegueDirection = "left" | "right" | "lateral";

export const stripTrailingSlash = (path: string) => {
    return path.replace(/\/$/, "");
}


export const getRelativePath = (root: string, urlPath: string) => {
    const urlPathParths = urlPath.split(root);
    if(
        urlPathParths.length !== 2 ||
        urlPathParths[0] !== ""
    ){
        return urlPath;
    }
    return urlPathParths[1];
}

const getPathPartsAreAncestors = (toPathParts: string[], fromPathParths: string[]) => {
    const commonLength = Math.min(toPathParts.length, fromPathParths.length);
    for(let i = 0; i < commonLength; i++){
        if(toPathParts[i] !== fromPathParths[i]){
            return false;
        }
    }
    return true;
}

export const getSegueDirection = (root: string, toPath: string, fromPath: string): 'right' | 'left' | 'lateral' => {
    if(toPath === fromPath){
        return 'lateral';
    }
    const relativeToPath = getRelativePath(root, stripTrailingSlash(toPath));
    const relativeFromPath = getRelativePath(root, stripTrailingSlash(fromPath));
    const toPathParts = relativeToPath.split('/').filter(p => p !== '');
    const fromPathParts = relativeFromPath.split('/').filter(p => p !== '');
    const areAncestors = getPathPartsAreAncestors(toPathParts, fromPathParts);
    if(!areAncestors){
        return 'lateral';
    }
    return (toPathParts.length > fromPathParts.length) ? 'right' : 'left';
}