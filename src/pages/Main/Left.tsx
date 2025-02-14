import { useNavigate } from 'react-router'

export default function Left() {
  const navigate = useNavigate()

  return (
    <div className="border-r w-52">
      <Button
        onClick={() =>
          navigate(`/welcome?data=${'welcome' + String(Math.random())}`)
        }
      >
        Welcome: change search
      </Button>

      <Button
        onClick={() =>
          navigate(
            `/form?data=${'form' + String(Math.random())}&tabKey=${String(
              Math.random()
            )}`
          )
        }
      >
        Form: create tab
      </Button>
    </div>
  )
}

function Button(props: React.ComponentProps<'div'>) {
  return (
    <div
      className="border-b py-4 hover:bg-black/5 hover:cursor-pointer w-full text-center select-none"
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}
