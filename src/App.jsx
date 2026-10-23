
import { useState } from 'react';

const initialCourses = [
  {
    id: 1,
    title: 'Web Development',
    code: 'DIT101',
    instructor: 'Mr. James',
    category: 'Programming',
    progress: 75,
    status: 'In Progress'
  },
  {
    id: 2,
    title: 'Database Management',
    code: 'DIT102',
    instructor: 'Ms. Sarah',
    category: 'Database',
    progress: 100,
    status: 'Completed'
  },
  {
    id: 3,
    title: 'Computer Networking',
    code: 'DIT103',
    instructor: 'Mr. Peter',
    category: 'Networking',
    progress: 45,
    status: 'In Progress'
  },
  {
    id: 4,
    title: 'Programming Fundamentals',
    code: 'DIT104',
    instructor: 'Ms. Grace',
    category: 'Programming',
    progress: 20,
    status: 'In Progress'
  },
  {
    id: 5,
    title: 'Information Systems',
    code: 'DIT105',
    instructor: 'Mr. Daniel',
    category: 'Information Systems',
    progress: 100,
    status: 'Completed'
  },
  {
    id: 6,
    title: 'Computer Applications',
    code: 'DIT106',
    instructor: 'Ms. Mary',
    category: 'Computer Skills',
    progress: 60,
    status: 'In Progress'
  }
];

function SummaryCard({ title, value, description }) {
  return (
    <article className="summary-card">
      <p>{title}</p>
      <h2>{value}</h2>
      <small>{description}</small>
    </article>
  );
}

function CourseCard({ course, onToggleStatus }) {
  const completed = course.status === 'Completed';

  return (
    <article className="course-card">
      <div className="course-top">
        <span className="course-code">{course.code}</span>
        <span className={completed ? 'badge completed' : 'badge progress'}>
          {course.status}
        </span>
      </div>

      <p className="category">{course.category}</p>
      <h3>{course.title}</h3>
      <p className="instructor">
        Instructor: {course.instructor}
      </p>

      <div className="progress-heading">
        <span>Course progress</span>
        <strong>{course.progress}%</strong>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-label={`${course.title} progress`}
        aria-valuenow={course.progress}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-fill"
          style={{ width: `${course.progress}%` }}
        />
      </div>

      <button
        type="button"
        className={completed ? 'secondary-button' : 'primary-button'}
        onClick={() => onToggleStatus(course.id)}
      >
        {completed ? 'Mark In Progress' : 'Mark Completed'}
      </button>
    </article>
  );
}

export default function App() {
  const [courses, setCourses] = useState(initialCourses);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const completedCount = courses.filter(
    course => course.status === 'Completed'
  ).length;

  const inProgressCount = courses.filter(
    course => course.status === 'In Progress'
  ).length;

  const averageProgress = courses.length
    ? Math.round(
        courses.reduce((total, course) => total + course.progress, 0)
        / courses.length
      )
    : 0;

  const visibleCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.code.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === 'All' || course.status === filter;

    return matchesSearch && matchesFilter;
  });

  function toggleStatus(id) {
    setCourses(previousCourses =>
      previousCourses.map(course => {
        if (course.id !== id) return course;

        const completed = course.status !== 'Completed';

        return {
          ...course,
          status: completed ? 'Completed' : 'In Progress',
          progress: completed ? 100 : 0
        };
      })
    );
  }

  return (
    <div className="app-layout">
      <aside className="sidebar">
        <h2 className="brand">Campus<span>Hub</span></h2>

        <p className="sidebar-label">MENU</p>

        <nav>
          <a className="nav-link active" href="#dashboard">
            Dashboard
          </a>
          <a className="nav-link" href="#courses">
            My Courses
          </a>
          <a className="nav-link" href="#overview">
            Progress Overview
          </a>
        </nav>

        <div className="student-profile">
          <div className="avatar">S</div>
          <div>
            <strong>Student</strong>
            <small>Information Technology</small>
          </div>
        </div>
      </aside>

      <main className="dashboard" id="dashboard">
        <header className="page-header">
          <div>
            <p className="eyebrow">STUDENT PORTAL</p>
            <h1>Student Course Dashboard</h1>
            <p className="subtitle">
              Welcome back! Track your learning and course progress.
            </p>
          </div>
          <div className="date-label">
            My Learning
          </div>
        </header>

        <section className="summary-grid" id="overview">
          <SummaryCard
            title="Total Courses"
            value={courses.length}
            description="Your enrolled courses"
          />
          <SummaryCard
            title="Completed"
            value={completedCount}
            description="Courses finished"
          />
          <SummaryCard
            title="In Progress"
            value={inProgressCount}
            description="Courses to continue"
          />
          <SummaryCard
            title="Average Progress"
            value={`${averageProgress}%`}
            description="Across all courses"
          />
        </section>

        <section className="courses-section" id="courses">
          <div className="section-heading">
            <div>
              <h2>My Courses</h2>
              <p>Explore and manage your enrolled courses.</p>
            </div>
            <span className="course-count">
              {visibleCourses.length} shown
            </span>
          </div>

          <div className="toolbar">
            <label className="search-box">
              <span>Search courses</span>
              <input
                type="search"
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder="Search by title, code or instructor..."
              />
            </label>

            <label className="filter-box">
              <span>Filter by status</span>
              <select
                value={filter}
                onChange={event => setFilter(event.target.value)}
              >
                <option value="All">All Courses</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>

          {visibleCourses.length === 0 ? (
            <div className="empty-state">
              <h3>No courses found</h3>
              <p>
                Try another search term or change the status filter.
              </p>
              <button
                type="button"
                className="primary-button"
                onClick={() => {
                  setSearch('');
                  setFilter('All');
                }}
              >
                Clear Search and Filter
              </button>
            </div>
          ) : (
            <div className="course-grid">
              {visibleCourses.map(course => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onToggleStatus={toggleStatus}
                />
              ))}
            </div>
          )}
        </section>

        <footer>
          CampusHub Student Portal · React Course Dashboard
        </footer>
      </main>
    </div>
  );
}
