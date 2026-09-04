document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuButton.textContent = navMenu.classList.contains("open") ? "✖" : "☰";
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with HTML and CSS.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with HTML, CSS, and JS.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const courseContainer = document.getElementById("course-container");
const totalCreditsSpan = document.getElementById("total-credits");

function displayCourses(courseList) {
    courseContainer.innerHTML = "";
    const totalCredits = courseList.reduce((acc, course) => acc + course.credits, 0);
    totalCreditsSpan.textContent = totalCredits;

    courseList.forEach(course => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-item");
        
        if (course.completed) {
            courseCard.classList.add("completed");
        } else {
            courseCard.classList.add("incomplete");
        }

        courseCard.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
        `;
        
        courseContainer.appendChild(courseCard);
    });
}

displayCourses(courses);

document.getElementById("btn-all").addEventListener("click", () => {
    displayCourses(courses);
});

document.getElementById("btn-wdd").addEventListener("click", () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    displayCourses(wddCourses);
});

document.getElementById("btn-cse").addEventListener("click", () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    displayCourses(cseCourses);
});