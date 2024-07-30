import React from "react"
import { FilterValue } from "../types"
import { Filters } from "./Filters"

interface Props{
    activeCount: number,
    completedCount: number,
    filterSelected: FilterValue
    onClearCompleted: () => void,  // function to call when clear completed button is clicked  // TODO: Define Todo type  // TODO: Add type checking for todos prop  // TODO: Add prop validation for todos prop  // TODO: Add type checking for onClearCompleted prop  // TODO: Add prop validation for onClearCompleted prop   // TODO: Add prop types for props   // TODO: Add prop default values for props   // TODO: Add prop descriptions for props   // TODO: Add prop types for props   // TODO: Add prop default values for props   // TODO: Add prop descriptions for props   // TODO: Add prop types for props   // TODO: Add prop default values for props   // TODO: Add prop descriptions for props   // TODO: Add prop types for props   // TODO: Add prop default values for props   // TODO: Add prop descriptions for props   // TODO: Add prop types
    handleFilterChange:(filter:FilterValue) => void
}

export const Footer: React.FC<Props>=({activeCount = 0, completedCount =0, filterSelected,handleFilterChange,onClearCompleted}) => {
    
    return(
        <footer className="footer">
            <span className="todo-count">
                <strong>{activeCount}</strong> Pending Tasks
            </span>

            <Filters 
                filterSelected = {filterSelected}
                onFilterChange ={handleFilterChange}
            />
            {
                completedCount > 0 && (
                    <button onClick={onClearCompleted} className="clear-completed">
                        Clear Completed
                    </button>
                )  // TODO: Add type checking for onClearCompleted prop  // TODO: Add prop validation for onClearCompleted prop   // TODO: Add prop types for props   // TODO: Add prop default values for props   // TODO: Add prop descriptions for props   // TODO: Add prop types for props   // TODO: Add prop default values for props   // TODO: Add prop descriptions for props   // TODO: Add prop types for props   // TODO: Add prop default values for props   // TODO: Add prop descriptions for props   // TODO: Add prop types for props   // TODO: Add prop default values for props   // TODO: Add prop descriptions for props   // TODO: Add prop types
            }
        </footer>
    )}