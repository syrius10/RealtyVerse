import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProperty } from '../store/actions/propertyActions';
import Reviews from './Reviews';
import ReviewForm from './ReviewForm';
import VirtualStaging from './VirtualStaging';
import SocialShare from './SocialShare';
import Advertisement from './Advertisement';
import Partnership from './Partnership';
import { Link } from 'react-router-dom';

const PropertyDetails = ({ match }) => {
  const dispatch = useDispatch();
  const property = useSelector(state => state.property);

  useEffect(() => {
    dispatch(fetchProperty(match.params.id));
  }, [dispatch, match.params.id]);

  const propertyUrl = `${window.location.origin}/property/${match.params.id}`;

  return (
    <div>
      {property && (
        <>
          <h1>{property.title}</h1>
          <p>{property.description}</p>
          <p>{property.price}</p>
          <Link to={`/property/${property._id}/virtual-tour`}>Virtual Tour</Link>
          <br />
          <Link to={`/property/${property._id}/ar-visualization`}>AR Visualization</Link>
          <VirtualStaging propertyId={property._id} />
          <SocialShare url={propertyUrl} />
          <Reviews propertyId={property._id} />
          <ReviewForm propertyId={property._id} agentId={property.agent} />
          <Advertisement />
          <Partnership />
        </>
      )}
    </div>
  );
};

export default PropertyDetails;