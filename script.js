document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('userTable').style.display = 'none';
    clearForm();
});

function submitUser() {
    // Get input values
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    if (!name || !department || !phoneNumber || !email) {
        alert('All fields are required.');
        return; 
    }
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNumber)) {
        alert('Phone number must be 10 digits and it should only contain numbers .');
        return; 
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return; 
    }
    const user = {
        name,
        department,
        phoneNumber,
        email
    };
    
    localStorage.setItem('user', JSON.stringify(user));
    hideButtons(['submitBtn']);
    showButtons(['editBtn', 'deleteBtn', 'displayBtn']);
    clearForm();
}
function loadUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userTableBody = document.getElementById('userTable').getElementsByTagName('tbody')[0];
    userTableBody.innerHTML = '';

    if (user) {
        const row = userTableBody.insertRow();
        row.insertCell(0).textContent = user.name;
        row.insertCell(1).textContent = user.department;
        row.insertCell(2).textContent = user.phoneNumber;
        row.insertCell(3).textContent = user.email;
    }
}

function displayUser() {
    const userTable = document.getElementById('userTable');
    loadUser();
    userTable.style.display = 'table';
}

function editUser() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user) {
        document.getElementById('name').value = user.name;
        document.getElementById('department').value = user.department;
        document.getElementById('phoneNumber').value = user.phoneNumber;
        document.getElementById('email').value = user.email;

        hideButtons(['editBtn', 'deleteBtn', 'displayBtn']);
        showButtons(['submitBtn']);
    }
}
function deleteUser() {
    localStorage.removeItem('user');
    hideButtons(['editBtn', 'deleteBtn', 'displayBtn']);
    showButtons(['submitBtn']);
    const userTable = document.getElementById('userTable');
    const userTableBody = userTable.getElementsByTagName('tbody')[0];
    userTableBody.innerHTML = '';
}

function clearForm() {
    document.getElementById('userForm').reset();
}

function showButtons(buttonIds) {
    buttonIds.forEach(id => {
        document.getElementById(id).style.display = 'inline';
    });
}

function hideButtons(buttonIds) {
    buttonIds.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });
}
