const students = {
    '22UAI001': {
        password: '1234',
        marks: {
            'Math': 85,
            'Science': 90,
            'English': 78,
            'History': 88
        },
        semesterMarks: [320, 340], // Example marks for two semesters
        progress: [75, 80, 85, 90] // Example progress over 4 terms
    },
    '22UAI002': {
        password: '1234',
        marks: {
            'Math': 90,
            'Science': 92,
            'English': 88,
            'History': 85
        },
        semesterMarks: [350, 360],
        progress: [85, 87, 90, 93]
    },
    '22UAI003': {
        password: '1234',
        marks: {
            'Math': 70,
            'Science': 65,
            'English': 72,
            'History': 68
        },
        semesterMarks: [275, 290],
        progress: [70, 68, 65, 67]
    },
    '22UAI004': {
        password: '1234',
        marks: {
            'Math': 85,
            'Science': 87,
            'English': 82,
            'History': 90
        },
        semesterMarks: [340, 355],
        progress: [80, 82, 85, 88]
    },
    '22UAI005': {
        password: '1234',
        marks: {
            'Math': 85,
            'Science': 87,
            'English': 82,
            'History': 90
        },
        semesterMarks: [340, 355],
        progress: [80, 82, 85, 88]
    },
};

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (students[name] && students[name].password === password) {
        message.style.color = '#28a745'; // Green for success
        message.textContent = 'Login successful!';

        // Save student data to localStorage and redirect to results page
        localStorage.setItem('studentData', JSON.stringify(students[name]));
        window.location.href = 'results.html';
    } else {
        message.style.color = '#dc3545'; // Red for error
        message.textContent = 'Invalid name or password!';
    }
});
