Imports System.IO
Imports System.Net
Imports Newtonsoft.Json

Public Class Form1
    Dim client As New WebClient()
    Public Shared Function GetImageFromUrl(ByVal url As String) As Image
        Dim httpWebRequest As HttpWebRequest = CType(HttpWebRequest.Create(url), HttpWebRequest)

        Using httpWebReponse As HttpWebResponse = CType(httpWebRequest.GetResponse(), HttpWebResponse)

            Using stream As Stream = httpWebReponse.GetResponseStream()
                Return Image.FromStream(stream)
            End Using
        End Using
    End Function
    Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load

        Try
            dgv1.RowTemplate.MinimumHeight = 50
            dgv1.Rows.Add(5)
            With dgv1
                .Rows(0).Cells(0).Value = GetImageFromUrl("http://localhost:8080/img/flag/Afghanistan.png")
                .Rows(1).Cells(0).Value = GetImageFromUrl("http://localhost:8080/img/flag/Albania.png")
                .Rows(2).Cells(0).Value = GetImageFromUrl("http://localhost:8080/img/flag/Belgium.png")
                .Rows(3).Cells(0).Value = GetImageFromUrl("http://localhost:8080/img/flag/Mauritania.png")
                .Rows(4).Cells(0).Value = GetImageFromUrl("http://localhost:8080/img/flag/Morocco.png")

                .Rows(0).Cells(1).Value = "http://localhost:8080/img/flag/Afghanistan.png"
                .Rows(1).Cells(1).Value = "http://localhost:8080/img/flag/Albania.png"
                .Rows(2).Cells(1).Value = "http://localhost:8080/img/flag/Belgium.png"
                .Rows(3).Cells(1).Value = "http://localhost:8080/img/flag/Mauritania.png"
                .Rows(4).Cells(1).Value = "http://localhost:8080/img/flag/Morocco.png"
            End With
        Catch ex As Exception

        End Try




    End Sub

    Private Sub cmdSend_Click(sender As Object, e As EventArgs) Handles cmdSend.Click
        Dim data1 = New rccData With {.key = txtKeyName.Text, .value = dgv1.CurrentRow.Cells(1).Value, .type = "text"}
        Dim data2 = New rccData With {.key = txtKeyImage.Text, .value = dgv1.CurrentRow.Cells(1).Value, .type = "image"}
        Dim allData = {data1, data2}
        Dim postData As String = "layerNumber=" & txtLayerNumber.Text & "&pageName=" & txtPageName.Text & "&data=" & JsonConvert.SerializeObject(allData)
        Dim data As Byte() = System.Text.Encoding.ASCII.GetBytes(postData)
        Dim url As String = "http://localhost:8080/recallPage"
        client.Headers.Add("Content-Type", "application/x-www-form-urlencoded")
        client.UploadData(url, data)

    End Sub

    Private Sub cmdUpdate_Click(sender As Object, e As EventArgs) Handles cmdUpdate.Click
        Dim data1 = New rccData With {.key = txtKeyName.Text, .value = dgv1.CurrentRow.Cells(1).Value, .type = "text"}
        Dim data2 = New rccData With {.key = txtKeyImage.Text, .value = dgv1.CurrentRow.Cells(1).Value, .type = "image"}
        Dim allData = {data1, data2}
        Dim postData As String = "layerNumber=" & txtLayerNumber.Text & "&pageName=" & txtPageName.Text & "&data=" & JsonConvert.SerializeObject(allData)
        Dim data As Byte() = System.Text.Encoding.ASCII.GetBytes(postData)
        Dim url As String = "http://localhost:8080/updateData"
        client.Headers.Add("Content-Type", "application/x-www-form-urlencoded")
        client.UploadData(url, data)
    End Sub

    Private Sub cmdStop_Click(sender As Object, e As EventArgs) Handles cmdStop.Click
        Dim postData As String = "layerNumber=" & txtLayerNumber.Text
        Dim data As Byte() = System.Text.Encoding.ASCII.GetBytes(postData)
        Dim url As String = "http://localhost:8080/stopGraphics"
        client.Headers.Add("Content-Type", "application/x-www-form-urlencoded")
        client.UploadData(url, data)
    End Sub

    Private Sub dgv1_CellContentClick(sender As Object, e As DataGridViewCellEventArgs) Handles dgv1.CellContentClick



    End Sub
End Class
Class rccData
    Public key As String
    Public value As String
    Public type As String
End Class