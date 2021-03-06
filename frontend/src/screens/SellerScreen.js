import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productsActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';

export default function SellerScreen(props) {
  const sellerId = props.match.params.id;
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const productList = useSelector(state => state.productList);
  const {
    loading: loadingProduct,
    error: errorProduct,
    products,
  } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);
  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <ul className="card card-body">
            <li className="row start">
              <div className="p-1">
                <img
                  className="small"
                  src={user.seller.logo}
                  alt={user.seller.name}
                />
              </div>
              <div className="p-1">
                <h1>{user.seller.name}</h1>
              </div>
            </li>
            <li>
              <Rating
                rating={user.seller.rating}
                numReviews={user.seller.numReviews}
              />
            </li>
            <li>
              <a href={`mailto:${user.mail}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingProduct ? (
          <LoadingBox />
        ) : errorProduct ? (
          <MessageBox variant="danger">{errorProduct}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="row center">
              {products.map(product => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
