import { useSelector } from 'react-redux'
import { RootState } from '@/src/redux/store'

export const useAppSelector = useSelector.withTypes<RootState>()
