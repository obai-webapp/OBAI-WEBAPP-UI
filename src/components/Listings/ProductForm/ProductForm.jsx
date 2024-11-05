import { useEffect, useState } from 'react';
import { Form as FormikForm, Formik } from 'formik';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components/Input/Input';
import * as Yup from 'yup';
import Loading from '@components/Loading/Loading';
import { toast } from 'react-toastify';

const ProductForm = ({ productModal, resetModal }) => {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);

    const initialValues = {
        title: product.title || '',
        briefSummary: product.briefSummary || '',
        price: product.price || '',
        seller: product.seller || '',
        description: product.description || ''
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        briefSummary: Yup.string().required('Brief summary is required'),
        price: Yup.number().typeError('Price must be a number').required('Price is required'),
        seller: Yup.string().required('Please select a user'),
        description: Yup.string().required('Description is required')
    });

    useEffect(() => {
        if (productModal.isEditable) fetchProductDetail(productModal.productId);
    }, [productModal.productId, productModal.isEditable]);

    const fetchProductDetail = async (productId) => {
        try {
            setLoading(true);
            // just a dummy API call
            // const data = await axiosWrapper('get', `some-base-url/product/${productId}`);

            //imitating a get request

            await delayedSetProduct();
            return productId;
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    //just a dummy function to set product state
    const delayedSetProduct = async () => {
        await new Promise((resolve) => {
            setTimeout(() => {
                setProduct({
                    title: 'Scotch tape',
                    briefSummary: 'A fine binding tape',
                    price: '123',
                    seller: 'babar azam',
                    description: 'Here is brief description about the product'
                });
                resolve();
            }, 1000); // Wait for 2000 milliseconds (2 seconds)
        });
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setSubmitting(true);
            const { method, endpoint } = getRequestMeta(productModal.isEditable);
            // submit request here
            // const data = await axiosWrapper(method, endpoint, values);
            toast.success(productModal.isEditable ? 'Item updated successfully' : 'Item created successfully');
            return { method, endpoint };
        } catch (error) {
            setSubmitting(false);
        } finally {
            resetModal();
        }
    };

    const getRequestMeta = (isEditable) => {
        if (isEditable) {
            return { method: 'PUT', endpoint: '/products/some-id' };
        }
        return { method: 'POST', endpoint: '/products' };
    };

    const sellerOptions = [
        { value: 'paul smith', label: 'Paul Smith' },
        { value: 'babar azam', label: 'Babar Azam' },
        { value: 'virat kohli', label: 'Virat Kohli' }
    ];

    return (
        <Container>
            {loading ? (
                <Loading />
            ) : (
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <FormikForm>
                            <Row>
                                <Col sm={12} md={6}>
                                    <Input name="title" placeholder="some title" label="Product title" type="text" />
                                </Col>
                                <Col sm={12} md={6}>
                                    <Input
                                        name="briefSummary"
                                        placeholder="brief summary"
                                        label="brief summary"
                                        type="text"
                                    />
                                </Col>
                                <Col sm={12} md={6}>
                                    <Input name="price" placeholder="100" label="price" type="text" />
                                </Col>
                                <Col sm={12} md={6}>
                                    <Input name="seller" label="select seller" type="select" options={sellerOptions} />
                                </Col>
                                <Col sm={12} md={12}>
                                    <Input
                                        name="description"
                                        placeholder="some description"
                                        label="description"
                                        type="textarea"
                                    />
                                </Col>
                            </Row>
                            <Button className="my-3" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <Loading centered size="sm" />
                                ) : productModal.isEditable ? (
                                    'Update'
                                ) : (
                                    'Create'
                                )}
                            </Button>
                        </FormikForm>
                    )}
                </Formik>
            )}
        </Container>
    );
};

export default ProductForm;
