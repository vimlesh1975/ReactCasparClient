<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()>
Partial Class Form1
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()>
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()>
    Private Sub InitializeComponent()
        Me.cmdSend = New System.Windows.Forms.Button()
        Me.cmdUpdate = New System.Windows.Forms.Button()
        Me.cmdStop = New System.Windows.Forms.Button()
        Me.Label1 = New System.Windows.Forms.Label()
        Me.txtKeyName = New System.Windows.Forms.TextBox()
        Me.txtLayerNumber = New System.Windows.Forms.TextBox()
        Me.txtPageName = New System.Windows.Forms.TextBox()
        Me.Label2 = New System.Windows.Forms.Label()
        Me.txtKeyImage = New System.Windows.Forms.TextBox()
        Me.GroupBox1 = New System.Windows.Forms.GroupBox()
        Me.GroupBox2 = New System.Windows.Forms.GroupBox()
        Me.dgv1 = New System.Windows.Forms.DataGridView()
        Me.Column1 = New System.Windows.Forms.DataGridViewImageColumn()
        Me.Column2 = New System.Windows.Forms.DataGridViewTextBoxColumn()
        Me.Button1 = New System.Windows.Forms.Button()
        Me.GroupBox1.SuspendLayout()
        Me.GroupBox2.SuspendLayout()
        CType(Me.dgv1, System.ComponentModel.ISupportInitialize).BeginInit()
        Me.SuspendLayout()
        '
        'cmdSend
        '
        Me.cmdSend.Location = New System.Drawing.Point(6, 136)
        Me.cmdSend.Name = "cmdSend"
        Me.cmdSend.Size = New System.Drawing.Size(75, 23)
        Me.cmdSend.TabIndex = 0
        Me.cmdSend.Text = "Show"
        Me.cmdSend.UseVisualStyleBackColor = True
        '
        'cmdUpdate
        '
        Me.cmdUpdate.Location = New System.Drawing.Point(6, 165)
        Me.cmdUpdate.Name = "cmdUpdate"
        Me.cmdUpdate.Size = New System.Drawing.Size(75, 23)
        Me.cmdUpdate.TabIndex = 2
        Me.cmdUpdate.Text = "Update"
        Me.cmdUpdate.UseVisualStyleBackColor = True
        '
        'cmdStop
        '
        Me.cmdStop.Location = New System.Drawing.Point(6, 194)
        Me.cmdStop.Name = "cmdStop"
        Me.cmdStop.Size = New System.Drawing.Size(75, 23)
        Me.cmdStop.TabIndex = 3
        Me.cmdStop.Text = "Stop"
        Me.cmdStop.UseVisualStyleBackColor = True
        '
        'Label1
        '
        Me.Label1.AutoSize = True
        Me.Label1.Location = New System.Drawing.Point(6, 25)
        Me.Label1.Name = "Label1"
        Me.Label1.Size = New System.Drawing.Size(73, 13)
        Me.Label1.TabIndex = 4
        Me.Label1.Text = "Layer Number"
        '
        'txtKeyName
        '
        Me.txtKeyName.Location = New System.Drawing.Point(226, 11)
        Me.txtKeyName.Name = "txtKeyName"
        Me.txtKeyName.Size = New System.Drawing.Size(38, 20)
        Me.txtKeyName.TabIndex = 5
        Me.txtKeyName.Text = "f0"
        '
        'txtLayerNumber
        '
        Me.txtLayerNumber.Location = New System.Drawing.Point(9, 41)
        Me.txtLayerNumber.Name = "txtLayerNumber"
        Me.txtLayerNumber.Size = New System.Drawing.Size(38, 20)
        Me.txtLayerNumber.TabIndex = 6
        Me.txtLayerNumber.Text = "96"
        '
        'txtPageName
        '
        Me.txtPageName.Location = New System.Drawing.Point(6, 99)
        Me.txtPageName.Name = "txtPageName"
        Me.txtPageName.Size = New System.Drawing.Size(89, 20)
        Me.txtPageName.TabIndex = 8
        Me.txtPageName.Text = "Imageandname"
        '
        'Label2
        '
        Me.Label2.AutoSize = True
        Me.Label2.Location = New System.Drawing.Point(3, 83)
        Me.Label2.Name = "Label2"
        Me.Label2.Size = New System.Drawing.Size(63, 13)
        Me.Label2.TabIndex = 7
        Me.Label2.Text = "Page Name"
        '
        'txtKeyImage
        '
        Me.txtKeyImage.Location = New System.Drawing.Point(84, 11)
        Me.txtKeyImage.Name = "txtKeyImage"
        Me.txtKeyImage.Size = New System.Drawing.Size(38, 20)
        Me.txtKeyImage.TabIndex = 11
        Me.txtKeyImage.Text = "img1"
        '
        'GroupBox1
        '
        Me.GroupBox1.BackColor = System.Drawing.Color.MistyRose
        Me.GroupBox1.Controls.Add(Me.Button1)
        Me.GroupBox1.Controls.Add(Me.txtPageName)
        Me.GroupBox1.Controls.Add(Me.Label2)
        Me.GroupBox1.Controls.Add(Me.txtLayerNumber)
        Me.GroupBox1.Controls.Add(Me.Label1)
        Me.GroupBox1.Controls.Add(Me.cmdStop)
        Me.GroupBox1.Controls.Add(Me.cmdUpdate)
        Me.GroupBox1.Controls.Add(Me.cmdSend)
        Me.GroupBox1.Location = New System.Drawing.Point(567, 14)
        Me.GroupBox1.Name = "GroupBox1"
        Me.GroupBox1.Size = New System.Drawing.Size(105, 332)
        Me.GroupBox1.TabIndex = 12
        Me.GroupBox1.TabStop = False
        Me.GroupBox1.Text = "Controls"
        '
        'GroupBox2
        '
        Me.GroupBox2.BackColor = System.Drawing.Color.SeaShell
        Me.GroupBox2.Controls.Add(Me.dgv1)
        Me.GroupBox2.Controls.Add(Me.txtKeyImage)
        Me.GroupBox2.Controls.Add(Me.txtKeyName)
        Me.GroupBox2.Location = New System.Drawing.Point(3, 3)
        Me.GroupBox2.Name = "GroupBox2"
        Me.GroupBox2.Size = New System.Drawing.Size(558, 349)
        Me.GroupBox2.TabIndex = 13
        Me.GroupBox2.TabStop = False
        Me.GroupBox2.Text = "Data"
        '
        'dgv1
        '
        Me.dgv1.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize
        Me.dgv1.Columns.AddRange(New System.Windows.Forms.DataGridViewColumn() {Me.Column1, Me.Column2})
        Me.dgv1.Location = New System.Drawing.Point(6, 37)
        Me.dgv1.Name = "dgv1"
        Me.dgv1.Size = New System.Drawing.Size(547, 306)
        Me.dgv1.TabIndex = 13
        '
        'Column1
        '
        Me.Column1.HeaderText = "Column1"
        Me.Column1.Name = "Column1"
        '
        'Column2
        '
        Me.Column2.HeaderText = "Column2"
        Me.Column2.Name = "Column2"
        Me.Column2.Width = 400
        '
        'Button1
        '
        Me.Button1.Location = New System.Drawing.Point(6, 279)
        Me.Button1.Name = "Button1"
        Me.Button1.Size = New System.Drawing.Size(75, 23)
        Me.Button1.TabIndex = 9
        Me.Button1.Text = "Test"
        Me.Button1.UseVisualStyleBackColor = True
        '
        'Form1
        '
        Me.AutoScaleDimensions = New System.Drawing.SizeF(6.0!, 13.0!)
        Me.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font
        Me.ClientSize = New System.Drawing.Size(678, 351)
        Me.Controls.Add(Me.GroupBox2)
        Me.Controls.Add(Me.GroupBox1)
        Me.Name = "Form1"
        Me.Text = "Form1"
        Me.GroupBox1.ResumeLayout(False)
        Me.GroupBox1.PerformLayout()
        Me.GroupBox2.ResumeLayout(False)
        Me.GroupBox2.PerformLayout()
        CType(Me.dgv1, System.ComponentModel.ISupportInitialize).EndInit()
        Me.ResumeLayout(False)

    End Sub

    Friend WithEvents cmdSend As Button
    Friend WithEvents cmdUpdate As Button
    Friend WithEvents cmdStop As Button
    Friend WithEvents Label1 As Label
    Friend WithEvents txtKeyName As TextBox
    Friend WithEvents txtLayerNumber As TextBox
    Friend WithEvents txtPageName As TextBox
    Friend WithEvents Label2 As Label
    Friend WithEvents txtKeyImage As TextBox
    Friend WithEvents GroupBox1 As GroupBox
    Friend WithEvents GroupBox2 As GroupBox
    Friend WithEvents dgv1 As DataGridView
    Friend WithEvents Column1 As DataGridViewImageColumn
    Friend WithEvents Column2 As DataGridViewTextBoxColumn
    Friend WithEvents Button1 As Button
End Class
