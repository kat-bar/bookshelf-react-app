import {auth} from '../../base'
import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import app from "../../base";
import Form from "../Form/Form";

import './Home.css';

function useBooks() {
    const [books, setBooks] = useState(null)

    useEffect(() => {
        app
            .firestore()
            .collection('bookshelf')
            .doc(auth.currentUser.uid)
            .collection('books')
            .onSnapshot((snapshot) => {
                const newTodo = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setBooks(newTodo)
            })
    }, [])

    return books
}

const Home = ({user}) => {
    let books = useBooks();
    const [book, setBook] = useState('')
    const [about, setAbout] = useState('')
    const [price, setPrice] = useState('')

    function onHandleDelete(id) {
        app
            .firestore()
            .collection('bookshelf')
            .doc(auth.currentUser.uid)
            .collection('books')
            .doc(id)
            .delete()
            .then(() => {
                console.log("Document successfully deleted!");
            }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    function onHandleUpdate(id) {
        if (book && about && price) {
            app
                .firestore()
                .collection('bookshelf')
                .doc(auth.currentUser.uid)
                .collection('books')
                .doc(id)
                .update({
                    'book': book,
                    'about': about,
                    'price': price
                }).then(() => {
                setBook('')
                console.log("Document successfully update!");
            }).catch((error) => {
                console.error("Error updating document: ", error);
            });
        } else {
            alert('Форма не должна быть пустой!')
        }

    }

    return (
        <div className="Home">
            <div className="container">
                <header className="Header">
                    <h1>Hello, <span>{user.displayName}</span></h1>
                    <button className="button signout" onClick={() => auth.signOut()}>Sign out</button>
                </header>

                <img src={user.photoURL} alt=""/>
                <Form
                    book={book}
                    setBook={setBook} about={about}
                    setAbout={setAbout}
                    price={price}
                    setPrice={setPrice}
                />
                <table>
                    <thead>
                    <tr>
                        <th>Книга</th>
                        <th>О книге</th>
                        <th>Цена</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        books ?
                            (books.map((book) =>
                                <tr key={book.id}>
                                    <td>{book.book}</td>
                                    <td>{book.about}</td>
                                    <td>{book.price} $</td>
                                    <td>
                                        <button title="Delete this item" onClick={() => onHandleDelete(book.id)}>&times;</button>
                                        <button title="Update this item" onClick={() => onHandleUpdate(book.id)}>Update</button>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td><Loader type="Oval" color="#36393E" height={30} width={30}/></td>
                                <td><Loader type="Oval" color="#36393E" height={30} width={30}/></td>
                                <td><Loader type="Oval" color="#36393E" height={30} width={30}/></td>
                            </tr>
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home;