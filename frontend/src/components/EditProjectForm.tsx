import { useState } from 'react';
import { Project } from '../types/Project';
import { updateProject } from '../api/ProjectAPI';

interface EditProjectFormProps {
  project: Project;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditProjectForm = ({
  project,
  onSuccess,
  onCancel,
}: EditProjectFormProps) => {
  const [formData, setFormData] = useState<Project>({ ...project });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateProject(formData.projectId, formData);
    onSuccess();
  };

  return (
    <div className="card p-4">
      <h2 className="card-title text-center">Edit Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Project Name:</label>
          <input
            type="text"
            name="projectName"
            className="form-control"
            value={formData.projectName}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Project Type:</label>
          <input
            type="text"
            name="projectType"
            className="form-control"
            value={formData.projectType}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Regional Program:</label>
          <input
            type="text"
            name="projectRegionalProgram"
            className="form-control"
            value={formData.projectRegionalProgram}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Impact:</label>
          <input
            type="number"
            name="projectImpact"
            className="form-control"
            value={formData.projectImpact}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Project Phase:</label>
          <input
            type="text"
            name="projectPhase"
            className="form-control"
            value={formData.projectPhase}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Functionality Status:</label>
          <input
            type="text"
            name="projectFunctionalityStatus"
            className="form-control"
            value={formData.projectFunctionalityStatus}
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Update Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProjectForm;
