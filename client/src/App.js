import { useEffect } from 'react';
import {Formik, Form, Field} from 'formik';
import {useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as chatActionsCreators from './actions/actionCreatos';

function App() {
  const {isFetching, error, messages} = useSelector(state=>state.chat);
  const dispatch = useDispatch();
  const {getMessageRequest, createMessageRequest} = bindActionCreators(chatActionsCreators, dispatch);
  useEffect(() => {
    getMessageRequest();
  }, []);

  return (
    <div>
      <Formik onSubmit={(values, formikBag)=>{
        createMessageRequest(values);
        formikBag.resetForm();
      }} 
      initialValues={{author:'',text:''}}>
        <Form>
          <Field name='author' placeholder='author'/>
          <Field name='text' placeholder='text'/>
          <button type='submit'>send</button>
        </Form>
      </Formik>
      <h2>
        List messages
      </h2>
      <ul>
        {isFetching && <li>load...</li>}
        {
          messages.map((msg)=>(<li key={msg._id}>{msg.text}</li>))
        }
      </ul>
    </div>
  );
}

export default App;
