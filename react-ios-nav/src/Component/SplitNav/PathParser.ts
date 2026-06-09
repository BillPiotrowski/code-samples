
export type SegueDirection = "left" | "right" | "lateral";

export const stripTrailingSlash = (path: string) => {
    return path.replace(/\/$/, "");
}


export const getRelativePath = (root: string, urlPath: string) => {
    const urlPathParts = urlPath.split(root);
    if(
        urlPathParts.length !== 2 ||
        urlPathParts[0] !== ""
    ){
        return urlPath;
    }
    return urlPathParts[1];
}

const getPathPartsAreAncestors = (toPathParts: string[], fromPathParts: string[]) => {
    const commonLength = Math.min(toPathParts.length, fromPathParts.length);
    for(let i = 0; i < commonLength; i++){
        if(toPathParts[i] !== fromPathParts[i]){
            return false;
        }
    }
    return true;
}

export const getSegueDirection = (root: string, toPath: string, fromPath: string): 'right' | 'left' | 'lateral' => {
    if(toPath === fromPath){
        return 'lateral';
    }
    const strippedFromPath = stripTrailingSlash(fromPath);
    const relativeToPath = getRelativePath(root, stripTrailingSlash(toPath));
    const relativeFromPath = getRelativePath(root, strippedFromPath);

    // If fromPath is outside this section's subtree, the navigation is cross-section — always lateral
    if(relativeFromPath === strippedFromPath){
        return 'lateral';
    }

    const toPathParts = relativeToPath.split('/').filter(p => p !== '');
    const fromPathParts = relativeFromPath.split('/').filter(p => p !== '');
    const areAncestors = getPathPartsAreAncestors(toPathParts, fromPathParts);
    if(!areAncestors){
        return 'lateral';
    }
    return (toPathParts.length > fromPathParts.length) ? 'right' : 'left';
}