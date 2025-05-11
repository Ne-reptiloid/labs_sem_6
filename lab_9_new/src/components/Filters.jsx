import "bootstrap/dist/css/bootstrap.min.css";

function Filters() {
    return (
        <div className="row">
          <div className="col-md-12">
          <input className="form-control" placeholder="Поиск" />
          <select className="form-select">
          <option>Начала новые</option>
          <option>Начала старые</option>
          </select>
          </div>
          </div>
    );
}

export default Filters;
