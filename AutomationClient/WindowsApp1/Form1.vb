Imports System.Net
Imports Newtonsoft.Json
Class Employee
    Public key As String
    Public value As String
    Public type As String
End Class
Public Class Form1
    Private Sub Button1_Click(sender As Object, e As EventArgs) Handles Button1.Click

        Dim list1 = New Employee With {.key = "f0", .value = TextBox1.Text, .type = "text"}
        Dim list2 = New Employee With {.key = "f1", .value = TextBox2.Text, .type = "text"}

        Dim aa = {list1, list2}
        Dim postData As String = "layerNumber=" & 1 & "&pageName=" & "Twoliner" & "&data=" & JsonConvert.SerializeObject(aa)
        Dim url As String = "http://localhost:8080/recallPage"
        Dim client As New WebClient()
        Dim data As Byte() = System.Text.Encoding.ASCII.GetBytes(postData)
        client.Headers.Add("Content-Type", "application/x-www-form-urlencoded")
        client.UploadData(url, data)

    End Sub

    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load

        End Sub
    End Class
