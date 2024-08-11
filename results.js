function calculateCGPA(marks) {
    const totalMarks = Object.values(marks).reduce((acc, mark) => acc + mark, 0);
    const numSubjects = Object.keys(marks).length;
    const average = totalMarks / numSubjects;
    const cgpa = (average / 10).toFixed(2);
    return { totalMarks, average, cgpa };
}

function renderStudentData(studentData) {
    const { marks, progress, semesterMarks } = studentData;
    const totalMarksElem = document.getElementById('totalMarks');
    const averageElem = document.getElementById('average');
    const cgpaElem = document.getElementById('cgpa');
    const marksList = document.getElementById('marksList');
    const marksCtx = document.getElementById('marksChart').getContext('2d');
    const gradesCtx = document.getElementById('gradesChart').getContext('2d');
    const semesterCtx = document.getElementById('semesterChart').getContext('2d');
    const progressCtx = document.getElementById('progressChart').getContext('2d');

    const { totalMarks, average, cgpa } = calculateCGPA(marks);

    // Display marks and grades
    marksList.innerHTML = '';
    const gradeDistribution = {
        'A': 0,
        'B': 0,
        'C': 0,
        'D': 0,
        'F': 0
    };
    for (const subject in marks) {
        const score = marks[subject];
        let grade = '';
        if (score >= 90) grade = 'A';
        else if (score >= 80) grade = 'B';
        else if (score >= 70) grade = 'C';
        else if (score >= 60) grade = 'D';
        else grade = 'F';
        gradeDistribution[grade]++;
        marksList.innerHTML += `<li>${subject}: ${score} (${grade})</li>`;
    }
    totalMarksElem.textContent = totalMarks;
    averageElem.textContent = average.toFixed(2);
    cgpaElem.textContent = cgpa;

    // Display charts
    new Chart(marksCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(marks),
            datasets: [{
                label: 'Marks',
                data: Object.values(marks),
                backgroundColor: '#007bff',
                borderColor: '#0056b3',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += `${context.parsed.y} marks`;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Marks'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Subjects'
                    }
                }
            }
        }
    });

    new Chart(gradesCtx, {
        type: 'pie',
        data: {
            labels: ['A', 'B', 'C', 'D', 'F'],
            datasets: [{
                label: 'Grade Distribution',
                data: Object.values(gradeDistribution),
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6c757d']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                label += `${context.parsed} Subject`;
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    new Chart(semesterCtx, {
        type: 'bar',
        data: {
            labels: ['Semester 1', 'Semester 2'],
            datasets: [{
                label: 'Total Marks',
                data: semesterMarks,
                backgroundColor: '#007bff',
                borderColor: '#0056b3',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += `${context.parsed.y} marks`;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Marks'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Semesters'
                    }
                }
            }
        }
    });

    new Chart(progressCtx, {
        type: 'line',
        data: {
            labels: ['Term 1', 'Term 2', 'Term 3', 'Term 4'],
            datasets: [{
                label: 'Progress Over Terms',
                data: progress,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderWidth: 2,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += `${context.parsed.y} marks`;
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Marks'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Terms'
                    }
                }
            }
        }
    });
}

// Get student data from localStorage
const studentData = JSON.parse(localStorage.getItem('studentData'));

// Check if data exists
if (studentData) {
    renderStudentData(studentData);
} else {
    document.body.innerHTML = '<h1>No student data found. Please login again.</h1>';
}

// Logout functionality
document.getElementById('logoutButton').addEventListener('click', function() {
    localStorage.removeItem('studentData');
    window.location.href = 'index.html';
    // Clear chart data
    const charts = document.querySelectorAll('.chart');
    charts.forEach(chart => {
        chart.getContext('2d').clearRect(0, 0, chart.width, chart.height);
    });
    // Reset student data
    studentData = null;
    document.body.innerHTML = '<h1>Logged out successfully.</h1>';
    // Clear form inputs
    const form = document.getElementById('loginForm');
    const inputs = form.querySelectorAll('input[type="text"], input[type="password"]');
    inputs.forEach(input => input.value = '');
    form.reset();
    
});
