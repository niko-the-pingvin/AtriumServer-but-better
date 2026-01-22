import { GetRequest } from './GlobalMethods.js';

const UsernameInput = document.getElementById('UsernameInput');
const UserIdInput = document.getElementById('UserIdInput');

const SearchByUsernameBtn = document.getElementById('SearchByUsernameBtn');
const GetByUserIdBtn = document.getElementById('GetByUserIdBtn');

const UsersResults = document.getElementById('UsersResults');
const UserInfoTemplate = document.getElementById('UserInfoTemplate');

UsernameInput.onkeyup = (evt) => {
    if(evt.key === 'Enter') SearchByUsername();
}

UserIdInput.onkeyup = (evt) => {
    if(evt.key === 'Enter') GetByUserId();
}

SearchByUsernameBtn.onclick = () => SearchByUsername();

GetByUserIdBtn.onclick = () => GetByUserId();

SearchByUsername();

function ClearResults() {
    while(UsersResults.firstChild) {
        UsersResults.removeChild(UsersResults.firstChild);
    }
}

function AddResults(results) {
    results.forEach((result) => {
        const NewUserInfoTemplate = UserInfoTemplate.content.cloneNode(true);

        NewUserInfoTemplate.getElementById('userId').innerHTML = result._id;
        NewUserInfoTemplate.getElementById('userId').href = `/admin/accounts/${result._id}`;

        NewUserInfoTemplate.getElementById('userName').innerHTML = `${result.public.username}/${result.public.displayName}`;
        NewUserInfoTemplate.getElementById('userIsJunior').innerHTML = result.public.isJunior;
        NewUserInfoTemplate.getElementById('userCreationDate').innerHTML = new Date(result.public.creationDate).toLocaleString();

        UsersResults.appendChild(NewUserInfoTemplate);
    });
}

function AddResultSingle(result){
    console.log(result);
    const NewUserInfoTemplate = UserInfoTemplate.content.cloneNode(true);

    NewUserInfoTemplate.getElementById('userId').innerHTML = result._id;
    NewUserInfoTemplate.getElementById('userId').href = `/admin/accounts/${result._id}`;

    NewUserInfoTemplate.getElementById('userName').innerHTML = `${result.public.username}/${result.public.displayName}`;
    NewUserInfoTemplate.getElementById('userIsJunior').innerHTML = result.public.isJunior;
    NewUserInfoTemplate.getElementById('userCreationDate').innerHTML = new Date(result.public.creationDate).toLocaleString();

    UsersResults.appendChild(NewUserInfoTemplate);
}

async function SearchByUsername() {
    ClearResults();
    const result = await GetRequest(`api/accounts/search/username?q=${UsernameInput.value}`);
    AddResults(result.response);
}

async function GetByUserId() {
    ClearResults();
    const result = await GetRequest(`api/admin/accounts/id/${UserIdInput.value}`);
    AddResultSingle(result.response);
}