import "bootstrap/dist/css/bootstrap.min.css";

function Note() {
    return (
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Заметка</h5>
          </div>
          <hr className="my-2" />
          <div className="card-body">
            <p className="card-text">Текст заметки</p>
          </div>
          <hr className="my-2" />
          <div className="card-footer">
            Дата создания
          </div>
          </div>
    );
}

export default Note;