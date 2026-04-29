const getGrowthScore = ({
    sessions,
    tasksCompleted,
    totalTasks,
    trustPoints,
}: {
    sessions: number;
    tasksCompleted: number;
    totalTasks: number;
    trustPoints: number;
}) => {
    const sessionScore = Math.min(sessions * 5, 40); // max 40
    const taskScore =
        totalTasks > 0 ? (tasksCompleted / totalTasks) * 40 : 0; // max 40
    const trustScore = Math.min(trustPoints / 50, 20); // max 20

    return Math.round(sessionScore + taskScore + trustScore);
};