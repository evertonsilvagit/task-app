import Link from "next/link";

export default function Page(){

    return (
        <div className="flex justify-center pt-5">
            <nav className="flex flex-col justify-center text-center">
                <Link href="/tasks">Tasks</Link>
                <Link href="/tasksWithContext">Tasks With Context</Link>
            </nav>
        </div>
    );
}