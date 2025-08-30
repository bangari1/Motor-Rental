# 🚀 Collaborative Git Workflow Guide

This guide explains how all contributors (e.g., 4 team members) can collaborate efficiently on this GitHub project. Follow these steps to keep the workflow smooth and organized.

---

## 1️⃣ Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name






2️⃣ Create a New Branch

Always create a new branch from the latest main:

git checkout main
git pull origin main
git checkout -b feature-yourname-brief-description


Examples:

git checkout -b feature-raj-login-page
git checkout -b fix-sara-navbar-bug







3️⃣ Make Changes and Commit

After making your changes, stage and commit them:

git add .
git commit -m "Add login form to homepage"


💡 Use meaningful commit messages.






4️⃣ Push Your Branch to GitHub
git push origin feature-yourname-brief-description





5️⃣ Open a Pull Request (PR)

Go to the GitHub repository.

Click Compare & pull request for your branch.

Fill in a clear title and description.

Make sure the base is main and compare it with your branch.

Click Create Pull Request.







6️⃣ Review & Merge PR

Ask teammates to review your PR.

Once approved, click Merge pull request.

After merging, delete the feature branch if it's no longer needed.








7️⃣ Update Local main Branch (After Merge)

After merging PRs or when others have merged theirs, sync your local main:

git checkout main
git pull origin main




💡 Collaboration Tips

🔁 Always pull before starting new work.

🌿 Use one branch per feature or bug fix.

🧹 Keep commits clean and messages meaningful.

🔍 Review teammates' PRs before merging.

📂 Use .gitignore to avoid committing unnecessary files.




✅ Done! You're ready to collaborate effectively 🚀
















