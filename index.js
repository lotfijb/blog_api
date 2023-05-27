const express = require("express");
const mysql = require("mysql");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
//db connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_blog",
});

// Connect to the MySQL server
connection.connect((error) => {
  if (error) {
    console.error("Error connecting to the database:", error);
    return;
  }
  console.log("Connected to the database");
});
//get users
app.get("/", (req, res) => {
  connection.query("SELECT * FROM users", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Failed to fetch data from the database" });
    } else {
      res.json(results);
    }
  });
});
//get posts
app.get("/posts", (req, res) => {
  connection.query("SELECT * FROM posts", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Failed to fetch data from the database" });
    } else {
      res.json(results);
    }
  });
});
//get comments
app.get("/comments", (req, res) => {
  connection.query("SELECT * FROM comments", (error, results) => {
    if (error) {
      console.error("Error executing query:", error);
      res.status(500).json({ error: "Failed to fetch data from the database" });
    } else {
      res.json(results);
    }
  });
});
//get post by id
app.get("/posts/:id", (req, res) => {
  connection.query(
    "SELECT * FROM posts WHERE id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res
          .status(500)
          .json({ error: "Failed to fetch data from the database" });
      } else {
        res.json(results);
      }
    }
  );
});
//get comments by post id
app.get("/comments/:id", (req, res) => {
  connection.query(
    "SELECT * FROM comments WHERE post_id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res
          .status(500)
          .json({ error: "Failed to fetch data from the database" });
      } else {
        res.json(results);
      }
    }
  );
});
//create a route that add a comment
app.post("/comments/:id", (req, res) => {
  connection.query(
    "INSERT INTO COMMENTS(content,post_id,author_id) VALUES(?,?,?)",
    [req.body.content, req.params.id, req.body.author_id],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res
          .status(500)
          .json({ error: "Failed to fetch data from the database" });
      } else {
        res.json(results.affectedRows);
      }
    }
  );
});
//route for creating a new post
app.post("/posts", (req, res) => {
  connection.query(
    "INSERT INTO posts(title,content,author_id) VALUES(?,?,?)",
    [req.body.title, req.body.content, req.body.author_id],
    (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res

          .status(500)
          .json({ error: "Failed to fetch data from the database" });
      } else {
        res.json(results);
      }
    }
  );
});
//route for registering new user
app.post("/users", (req, res) => {
  connection.query(
    "INSERT INTO users(username,email,password) VALUES(?,?,?)",
    [req.body.username, req.body.email, req.body.password],
    (error, results) => {
      if (error) {
        console.error("Error registering new user");
        res.status(500).json({ error: "Couldn't register new user" });
      } else {
        res.json(results);
      }
    }
  );
});
//route for logging in : check if user exists before then see if passwords match
app.post("/login", (req, res) => {
  connection.query(
    "SELECT * FROM users WHERE username = ?",
    [req.body.username],
    (error, results) => {
      if (error) {
        console.error("Error logging in");
        res.status(500).json({ error: "Couldn't log in" });
      } else {
        if (results.length > 0) {
          if (results[0].password === req.body.password) {
            res.json({ id: results[0].id, logged: true });
          } else {
            res.status(500).json({ error: "Wrong password" });
          }
        } else {
          res.status(500).json({ error: "User doesn't exist" });
        }
      }
    }
  );
});
//route for deleting a post
app.delete("/posts/:id", (req, res) => {
  connection.query(
    "DELETE FROM posts WHERE id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.error("Error deleting post");
        res.status(500).json({ error: "Couldn't delete post" });
      } else {
        res.json(results);
      }
    }
  );
});
//route for deleting a comment
app.delete("/comments/:id", (req, res) => {
  connection.query(
    "DELETE FROM comments WHERE id = ?",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.error("Error deleting comment");
        res.status(500).json({ error: "Couldn't delete comment" });
      } else {
        res.json(results);
      }
    }
  );
});
//route for updating a post
app.put("/posts/:id", (req, res) => {
  connection.query(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [req.body.title, req.body.content, req.params.id],
    (error, results) => {
      if (error) {
        console.error("Error updating post");
        res.status(500).json({ error: "Couldn't update post" });
      } else {
        res.json(results);
      }
    }
  );
});
//route for updating a comment
app.put("/comments/:id", (req, res) => {
  connection.query(
    "UPDATE comments SET content = ? WHERE id = ?",
    [req.body.content, req.params.id],
    (error, results) => {
      if (error) {
        console.error("Error updating comment");
        res.status(500).json({ error: "Couldn't update comment" });
      } else {
        res.json(results);
      }
    }
  );
});

//run on port 5000
app.listen(5000, () => {
  console.log("Server is running on port 5000.");
});
