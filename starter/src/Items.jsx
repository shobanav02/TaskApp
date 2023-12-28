import customFetch from '../util';
import SingleItem from './SingleItem';
import { useQuery } from '@tanstack/react-query';
const Items = () => {

  const {isLoading, data , error , isError} = useQuery({
     queryKey:['tasks'],
     queryFn: async() => {
        const { data} = await customFetch.get('/');
        return data;
     } ,
  });

 
  if (isLoading) {
    return<p style={{marginTop :' 1rem'}} >
      Loading..
    </p>
  }

  if (isError) {
    return <p style={{marginTop :' 1rem'}} >
      {error.message}
    </p>
  }

  // if (error) {
  //   return <p style={{marginTop :' 1rem'}} >
  //     {error.message}
  //   </p>
  // }
  return (
    <div className='items'>
      {data.taskList.map((item) => {
        return <SingleItem key={item.id} item={item} />;
      })}
    </div>
  );
};
export default Items;
