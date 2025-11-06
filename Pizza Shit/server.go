package main

import (
	"fmt"
	"html/template"
	"net/http"
)
type ViewData struct{
 
    Title string
    Message string
}
func main() {
      
    http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        tmpl, _ := template.ParseFiles("templates/index.html")
        tmpl.Execute(w, nil)
    })
 
    fmt.Println("Server is listening...")
    http.ListenAndServe(":8181", nil)
}