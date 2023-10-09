import { createSignal, onMount } from 'solid-js';
import { useUIDispatch } from '../context/ui';
import { User } from '../types/user';
import { getUsers } from '../api/user';
import { FirebaseError } from 'firebase/app';
import { useAuthState } from '../context/auth';

const useUsers = () => {
  const { user } = useAuthState()!;
  const { addSnackbar } = useUIDispatch();
  const [users, setUsers] = createSignal<User[]>([]);
  const [isLoading, setIsLoading] = createSignal<boolean>(true);

  onMount(() => {
    loadUsers();
  });

  const loadUsers = async () => {
    try {
      const users = await getUsers(user!);
      setUsers(users);
    } catch (error) {
      const message = (error as FirebaseError).message;
      addSnackbar({ message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    users,
  };
};

export default useUsers;
