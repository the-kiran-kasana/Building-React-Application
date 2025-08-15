export default function TaskFilters({
  search,
  setSearch,
  filterPriority,
  setFilterPriority,
  filterCompleted,
  setFilterCompleted,
  sortBy,
  setSortBy,
}) {
  return (
    <div className="filters">
      <input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)}>
        <option value="all">All priorities</option>
        <option value="low">Low</option>
        <option value="normal">Normal</option>
        <option value="high">High</option>
      </select>
      <select value={filterCompleted} onChange={(e) => setFilterCompleted(e.target.value)}>
        <option value="all">All statuses</option>
        <option value="done">Completed</option>
        <option value="todo">Not completed</option>
      </select>
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="createdAt">Sort: Created date</option>
        <option value="priority">Sort: Priority</option>
      </select>
    </div>
  );
}
