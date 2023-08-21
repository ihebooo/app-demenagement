
import Donat from '../../components/stats/donat';
import Line from '../../components/stats/line'
const people = [
    {
      name: 'Leslie Alexander',
      email: 'lesliealexander@example.com',
      role: 'Co-Founder / CEO',
      imageUrl:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }
    ]
  
  export default function Dashboard() {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Donat/>
      </div>
      
    )
  }
  