import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AddressLink from '../AddressLink';
import PlaceGallery from '../PlaceGallery';

const BookingPage = () => {
    const {id} = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
      if(id) {
        axios.get('/bookings').then(response => {
          const foundBooking = response.data.find(({_id}) => _id === id);
          if(foundBooking) {
            setBooking(foundBooking);
          }
        })
      }
    }, [id])
    if(!booking) {
      return '';
    }
  return (
    <div className='my-8'>
      <h1 className='text-3xl'>{booking.place.title}</h1>
      <AddressLink className='my-2 block'>{booking.place.address}</AddressLink>
      <div className='bg-gray-200 p-4 mb-4 rounded-2xl'>
        <h2 className='text-xl'>Your booking Information</h2>
        
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  )
}

export default BookingPage
