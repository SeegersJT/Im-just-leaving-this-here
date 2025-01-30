export const formatConstantAllocation = (allocation) => ({
  courseResultNo: allocation.courseResultNo || null,
  courseNo: allocation.courseNo || null,
  courseTitle: allocation.courseTitle || null,
  courseDescription: allocation.courseDescription || null,
  courseDuration: allocation.courseDuration || null,
  courseDifficultyNo: allocation.courseDifficultyNo || null,
  courseDifficulty: allocation.courseDifficulty || null,
  courseDate: allocation.courseDate || null,
  active: allocation.active || null
});
