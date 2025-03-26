import { useEffect, useState } from 'react';
import { Project } from '../types/Project';
import { useNavigate } from 'react-router-dom';

function ProjectList({ selectedCategories }: { selectedCategories: string[] }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      'Fetching projects... Selected Categories:',
      selectedCategories
    );

    const fetchProjects = async () => {
      const categoryParams = selectedCategories
        .map((cat) => `projectTypes=${encodeURIComponent(cat)}`)
        .join('&');

      const apiUrl = `https://localhost:4050/api/Water/AllProjects?PageSize=${pageSize}&pageNum=${pageNum}${
        selectedCategories.length ? `&${categoryParams}` : ''
      }`;

      console.log('Fetching from URL:', apiUrl); // 🚀 Debugging step

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API Error: ${response.statusText}`);

        const data = await response.json();
        console.log('API Response:', data); // 🚀 Debugging step

        setProjects(data.projects);
        setTotalItems(data.totalCount);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, [pageSize, pageNum, selectedCategories]);

  useEffect(() => {
    setTotalPages(Math.max(Math.ceil(totalItems / pageSize), 1)); // Ensure at least 1 page
  }, [totalItems, pageSize]);

  return (
    <>
      {projects.map((p) => (
        <div id="projectCard" className="card" key={p.projectId}>
          <h3 className="card-title">{p.projectName}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Project Type:</strong> {p.projectType}
              </li>
              <li>
                <strong> Regional Program: </strong>
                {p.projectRegionalProgram}
              </li>
              <li>
                <strong>Impact: </strong> {p.projectImpact} Individuals Served
              </li>
              <li>
                <strong>Project Phase: </strong>
                {p.projectPhase}{' '}
              </li>
              <li>
                <strong>Project Status: </strong>
                {p.projectFunctionalityStatus}{' '}
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/donate/${p.projectName}/${p.projectId}`)
              }
            >
              Donate
            </button>
          </div>
        </div>
      ))}

      <br />
      <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
        Previous
      </button>

      {[...Array(totalPages)].map((_, i) => (
        <button
          key={i + 1}
          onClick={() => setPageNum(i + 1)}
          disabled={pageNum === i + 1}
        >
          {i + 1}
        </button>
      ))}

      <button
        disabled={pageNum === totalPages}
        onClick={() => setPageNum(pageNum + 1)}
      >
        Next
      </button>

      <br />
      <label>
        Results per page:
        <select
          value={pageSize}
          onChange={(p) => {
            setPageSize(Number(p.target.value));
            setPageNum(1);
          }}
          className="select"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default ProjectList;
