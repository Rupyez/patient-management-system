
interface PatientAvatarProps {
  firstName: string;
  lastName: string;
}


export default function PatientAvatar({firstName, lastName}:PatientAvatarProps){
      const initials = `${firstName[0]}${lastName[0]}`;


    return(
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-sky-500 font-semibold text-white">
            {initials}
        </div>
    )
}