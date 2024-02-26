const express = require("express");
const router = express.Router();
const User = require("../models/users");

// default list
const defaultList = {
  listName: "Getting Started",
  listItems: [
      {
        listItem: "Welcome to my free to do list"
      },
      {
        listItem: "Hit + to add new items"
      },
      {
        listItem: "Hit this to delete an item"
      },
      {
        listItem: "Stay productive"
      }
  ],
};

// route to get the login page
router.get("/", (req, res) => {
  res.render("signin", { pageTitle: "Sign In | To Do List" });
});

// route to get the sign up page
router.get("/signup", (req, res) => {
  res.render("signup", { pageTitle: "Sign Up | To Do List" });
});

// route to create a new list
router.get("/dashboad/:username/new-list", async (req, res) => {
  res.render("new-list", { pageTitle: "Create New List", username: req.params.username });
});

// login or sign up redirect to the dashboard
router.post("/dashboard", async (req, res) => {
  const userType = req.body.pageTitle;
  try {
    if (userType === "Sign In | To Do List") {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });

      if (user) {
        renderDashboard(res, user);
      }
    } else if (userType === "Sign Up | To Do List") {
      const existingUser = await User.findOne({ username: req.body.username });

      if (existingUser) {
        res.send("This username is already taken, please try another one");
      } else {
        const user = new User({
          firstname: req.body.firstname,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        });

        user.save()
          .then((user) => {
            renderDashboard(res, user);
          })
          .catch((err) => {
            res.json({ message: err.message, type: "danger" });
          });
      }
    } else if (userType === "Create New List") {
      const username = req.body.username;
      const newList = {
        listName: req.body.newListName,
        listItems: [],
      };

      User.findOneAndUpdate({ username }, { $push: { lists: newList } }, { new: true })
        .then((updatedUser) => {
          renderDashboard(res, updatedUser);
        })
        .catch((error) => {
          // Handle any potential errors
        });
    } else if (userType === "Edit List Name") {
      const username = req.body.username;
      const newListName = req.body.newListName;

      User.findOneAndUpdate(
        { username },
        { $set: { "lists.$[elem].listName": newListName } },
        { new: true, arrayFilters: [{ "elem.listName": { $exists: true } }] }
      )
        .then((updatedUser) => {
          renderDashboard(res, updatedUser);
        })
        .catch((error) => {
          // Handle any potential errors
        });
    }
  } catch (error) {
    // dd
  }
});

// route to view a list
router.get("/dashboard/:username/:listName", async (req, res) => {
  const currentUserName = req.params.username;
  const listToView = req.params.listName;
  const foundUser = await User.findOne({ username: currentUserName });

  try {
    if (listToView === "Getting Started") {
      const pageTitle = `${currentUserName}'s ${listToView} List | To Do List`;

      res.render("list", {
        pageTitle,
        username: currentUserName,
        listTitle: defaultList.listName,
        listItems: defaultList.listItems,
        userLists: defaultList,
      });
    } else {
      if (foundUser) {
        const customList = foundUser.lists.find((list) => list.listName === listToView);

        if (customList) {
          renderList(res, currentUserName, listToView, customList, foundUser);
        } else {
          res.status(404).send("List not found");
        }
      } else {
        res.status(404).send("User not found");
      }
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// route to the about page
router.get("/dashboard/about", (req, res) => {
  res.render("about", {pageTitle: "About | To Do List"});
});

// route to add a list item
router.post("/dashboard/:username/:listName", async (req, res) => {
  const currentUserName = req.params.username;
  const currentList = req.params.listName;
  const item = req.body.newItem;

  await User.findOne({ username: currentUserName })
    .then((user) => {
      if (currentList === "Getting Started") {
        defaultList.listItems.push(item);
        return user.save();
      } else {
        const customList = user.lists.find((list) => list.listName === currentList);

        if (customList) {
          customList.listItems.push({ listItem: item });
          return user.save();
        } else {
          res.status(404).send("List not found");
        }
      }
    })
    .then((updatedUser) => {
      res.redirect(`/dashboard/${currentUserName}/${currentList}`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});

// route to delete a list item
router.post("/delete", (req, res) => {
  const itemIdToDelete = req.body.checkbox;
  const listName = req.body.listName;
  const username = req.body.username;

  User.findOne({ username })
    .then((user) => {
      if (listName === "Getting Started") {
        defaultList.listItems.splice(itemIdToDelete, 1);
        return user.save();
      } else {
        const customList = user.lists.find((list) => list.listName === listName);

        if (customList) {
          customList.listItems.splice(itemIdToDelete, 1);
          return user.save();
        } else {
          res.status(404).send("List not found");
        }
      }
    })
    .then((updatedUser) => {
      res.redirect(`/dashboard/${username}/${listName}`);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});

// route to delete a list
router.post("/dashboard/delete-list", (req, res) => {
  const { username, listName } = req.body;
  
  User.findOneAndUpdate(
    { username },
    { $pull: { lists: { listName } } },
    { new: true }
  )
    .then((updatedUser) => {
      renderDashboard(res, updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});

// Route to redirect user to their dashboard
router.get("/dashboard/:username", async (req, res) => {
  const username = req.params.username;
  const user = await User.findOne({username});

      if (user) {
        renderDashboard(res, user);
      } 
});

// Route to render the edit list name form
router.get("/dashboard/:username/:listName/edit", async (req, res) => {
  const currentUserName = req.params.username;
  const listToEdit = req.params.listName;
  const foundUser = await User.findOne({ username: currentUserName });

  try {
    if (foundUser) {
      const customList = foundUser.lists.find((list) => list.listName === listToEdit);

      if (customList) {
        res.render("edit-list", {
          pageTitle: "Edit List Name",
          username: currentUserName,
          listName: listToEdit,
        });
      } else {
        res.status(404).send("Encounted an error, we will have it fixed soon");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

function renderDashboard(res, user) {
  res.render("dashboard", {
    pageTitle: `${user.username}'s Dashboard | To Do List`,
    username: user.username,
    lists: user.lists,
    defaultList: defaultList
  });
}

function renderList(res, currentUserName, listToView, list, foundUser) {
  const pageTitle = `${currentUserName}'s ${listToView} List | To Do List`;

  res.render("list", {
    pageTitle,
    username: currentUserName,
    listTitle: list.listName,
    listItems: list.listItems,
    userLists: foundUser.lists,
  });
}

module.exports = router;