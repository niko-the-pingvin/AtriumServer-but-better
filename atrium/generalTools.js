const LL = "--------------------";
const CdnDir = __dirname + '/cdn/';
const FilteredCharacters = ["#", "(", ")", "/", "*", "$", `"`, "£", "&", "+", "~", "?", "\\", "/", ":", ";", "@", "'", "!"];

function FilterCharacters(string){
    for(let char in string){
        if(FilteredCharacters[char] !== null) string.replace(FilteredCharacters[char], "-");
    }
    return string;
}

module.exports = { LL, CdnDir, FilterCharacters };