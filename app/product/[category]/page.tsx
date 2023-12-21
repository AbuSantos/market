interface Props {
    params: {
        category: string,
    }
}
const page = ({ params }: Props) => {
    return (
        <div className="mt-24">{params.category}</div>
    )
}

export default page