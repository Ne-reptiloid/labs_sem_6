import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";

function Note({title, description, createdAt}) {
    return (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">{title}</h5>
          </div>
          <hr className="my-2" />
          <div className="card-body">
            <p className="card-text">{description}</p>
          </div>
          <hr className="my-2" />
          <div className="card-footer">
            {moment(createdAt).format("DD/MM/YYYY h:mm:ss")}
          </div>
          </div>
    );
}

export default Note;
