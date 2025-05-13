import "bootstrap/dist/css/bootstrap.min.css";

function Filters({ filter, setFilter }) {
  return (
    <div className="d-flex flex-column gap-3">
      <input
        className="form-control"
        placeholder="Поиск"
        onChange={(e) => setFilter({ ...filter, search: e.target.value })}
      />
      <select
        className="form-select"
        onChange={(e) => setFilter({ ...filter, sortOrder: e.target.value })}
      >
        <option value="desc">Сначала новые</option>
        <option value="asc">Сначала старые</option>
      </select>
    </div>
  );
}

export default Filters;