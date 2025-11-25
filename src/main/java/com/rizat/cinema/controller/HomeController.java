package com.rizat.cinema.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String index() {
        return "forward:/index.html";
    }

    // Catch all routes and forward to index.html for React Router
    @RequestMapping(value = "/{path:[^\\.]*}")
    public String forwardToIndexHtml() {
        return "forward:/index.html";
    }
}
