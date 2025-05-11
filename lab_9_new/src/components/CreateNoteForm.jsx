import "bootstrap/dist/css/bootstrap.min.css";

function CreateNoteForm() {
    return (
        <form className="w-100">
            <h3 className="font-weight-bold">Создание заметки</h3>
            <input className="form-control" placeholder="Название" />
            <textarea className="form-control" placeholder="Описание" />
            <button className="btn btn-primary">Создать</button>
          </form>
    );
}

export default CreateNoteForm;
