import { skills } from "../../data/skills";

export default function Skills() {
    return (
        <div className="mb-24">
            <h2 className="text-4xl mb-5 font-bold tracking-tight">What I Use</h2>
            <p className="dark:text-zinc-400 text-zinc-600 max-w-xl">
                A mix of my favorite tools, platforms, and frameworks that I’ve been using to build stuff.
            </p>
            <ul className="flex items-center flex-wrap gap-x-5 gap-y-4 my-6">
                {skills.map((value) => (
                    <li key={value.id}>
                        <div className="flex items-center dark:border-b-zinc-800 border-zinc-200 group">
                            <value.icon
                                size={value.size || 23}
                                className="flex-shrink-0 text-zinc-500 group-hover:dark:text-white group-hover:text-zinc-800 duration-300"
                                aria-hidden="true"
                            />
                            &nbsp;
                            {value.name}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}