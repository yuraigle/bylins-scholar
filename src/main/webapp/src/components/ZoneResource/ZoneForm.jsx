import React from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

const ZoneSchema = Yup.object().shape({
  n: Yup.number()
    .typeError('Номер зоны должен быть числом')
    .min(10, 'Не меньше 2 знаков')
    .max(9999, 'Не больше 4 знаков')
    .required('Обязательное поле'),
  name: Yup.string()
    .min(2, 'Название слишком короткое')
    .max(48, 'Название слишком длинное')
    .required('Обязательное поле'),
  repop: Yup.number()
    .typeError('Время репопа должно быть числом')
    .min(10, 'Не меньше 10 минут')
    .max(120, 'Не больше 120 минут')
});

export default React.forwardRef(({row, onSubmit}, ref) => (
    <Formik
      ref={ref}
      initialValues={{
        n: (row) ? row.n : '',
        name: (row) ? row.name : '',
        repop: (row) ? row.repop : '',
      }}
      validationSchema={ZoneSchema}
      onSubmit={onSubmit}
    >
      {({errors, touched}) => (
        <Form>
          <div className="form-group">
            <label htmlFor="n">Номер зоны:</label>
            <Field name="n"
                   className={'form-control' + (errors.n && touched.n ? ' is-invalid' : '')}/>
            <ErrorMessage name="n" component="div" className="invalid-feedback"/>
          </div>
          <div className="form-group">
            <label htmlFor="name">Название:</label>
            <Field name="name"
                   className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}/>
            <ErrorMessage name="name" component="div" className="invalid-feedback"/>
          </div>
          <div className="form-group">
            <label htmlFor="name">Время репопа (мин.):</label>
            <Field name="repop"
                   className={'form-control' + (errors.repop && touched.repop ? ' is-invalid' : '')}/>
            <ErrorMessage name="repop" component="div" className="invalid-feedback"/>
          </div>
        </Form>
      )}
    </Formik>
  )
);
