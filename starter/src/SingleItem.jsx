import { useMutation, useQueryClient } from "@tanstack/react-query";
import customFetch from "../util";
import { toast } from 'react-toastify';
const SingleItem = ({ item }) => {

 const queryClient = useQueryClient();
 const { mutate :editTask} = useMutation({
  mutationFn: ({taskId, isDone}) => {
    return customFetch.patch(`/${taskId}`, {isDone})
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey:['tasks']
    })
    toast.success('Task updated');
  },
  onError : (error) => {
    toast.error(error.data.msg)
  }
 });

 const { mutate :deleteTask, isLoading} = useMutation({
  mutationFn: (taskId) => {
    return customFetch.delete(`/${taskId}`)
  },
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey:['tasks']
    })
    toast.success('Task deleted');
  },
  onError : (error) => {
    toast.error(error.data.msg)
  }
 })
  return (
    <div className='single-item'>
      <input
        type='checkbox'
        checked={item.isDone}
        onChange={() => editTask({taskId : item.id , isDone: !item.isDone})}
      />
      <p
        style={{
          textTransform: 'capitalize',
          textDecoration: item.isDone && 'line-through',
        }}
      >
        {item.title}
      </p>
      <button
        className='btn remove-btn'
        type='button'
        disabled={isLoading}
        onClick={() => deleteTask( item.id )}
      >
        delete
      </button>
    </div>
  );
};
export default SingleItem;
