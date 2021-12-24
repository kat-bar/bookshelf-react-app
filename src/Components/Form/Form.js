import './Form.css'
import app, {auth} from "../../base";

const Form = (props) => {

    function onHandleSubmit(e) {
        e.preventDefault()
        if (props.book && props.about && props.price) {
            app
                .firestore()
                .collection('bookshelf')
                .doc(auth.currentUser.uid)
                .collection('books')
                .add({
                    'book': props.book,
                    'about': props.about,
                    'price': props.price
                })
                .then(() => {
                    props.setBook('');
                    props.setAbout('');
                    props.setPrice('');
                })
        } else { alert('Форма не должна быть пустой!') }
    }

    return (
        <div className='TodoForm'>
            <form onSubmit={onHandleSubmit}>
                <input
                    name="book"
                    placeholder='Book'
                    type="text"
                    value={props.book}
                    onChange={(event) => props.setBook(event.currentTarget.value)}
                    maxLength={128}
                />
                <input
                    name="about"
                    placeholder='About book'
                    type="text"
                    value={props.about}
                    onChange={(event) => props.setAbout(event.currentTarget.value)}
                    maxLength={128}
                />
                <input
                    name="price"
                    placeholder='Book price'
                    type="text"
                    value={props.price}
                    onChange={(event) => props.setPrice(event.currentTarget.value)}
                    maxLength={128}
                />
                <button type='submit'>ADD</button>
            </form>
        </div>
    );
};

export default Form;