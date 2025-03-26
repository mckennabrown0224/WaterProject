import { useState } from 'react';
import CategoryFilter from '../components/CategoryFilter';
import ProjectList from '../components/ProjectList';
import WelcomeBand from '../components/WelcomeBand';
import CartSummary from '../components/CartSummary';

function ProjectsPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="container mt-4">
      <CartSummary/>
      <WelcomeBand />
      <div>
        <br></br>
      </div>
      <div className="row">
        <div className="col-md-4">
          <CategoryFilter
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
        </div>
        <div className="col-md-8">
          <ProjectList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;